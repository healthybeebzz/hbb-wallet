import * as http from 'http';
import {Request, Response} from 'express';
import * as express from "express";
import {connectToDb} from './db-connection'
import {computeBalance} from "./compute-balance";
import {insertTransaction, OperationType} from "./transactions";
import {fetchTransactions} from "./transactions";
import {payloadValidationMiddleware} from "./payload-validation-middleware";
import {errorHandler} from "./error-handler";



export const createWebServer = () => {
    const pool = connectToDb();
    const app = express();

    const port = 3000;

    app.use(express.json());

    app.get('/balance/:userId', errorHandler, async (req: Request, res: Response) => {
        if (!req.params.userId) throw new Error('The `userId` parameter is not present.');

        // Fetch all the transactions for the current userId from the database.
        const transactions = await fetchTransactions(pool, Number(req.params.userId));

        // Compute based on the list of debit and credit transactions what is the available balance.
        const balance = computeBalance(transactions);

        // Build the response object.
        const response = {
            userId: req.params.userId,
            balance: balance
        }

        res.send(response);
    });

    app.post('/balance/credit', payloadValidationMiddleware, errorHandler, async (req: Request, res: Response) => {

        // Insert the transaction in the database.
        let credit = 'credit';
        await insertTransaction(pool, req.body.userId, req.body.amount, req.body.referenceId, OperationType.CREDIT);

        // Fetch all the transactions for the current userId from the database.
        const transactions = await fetchTransactions(pool, req.body.userId);

        // Compute based on the list of debit and credit transactions what is the available balance.
        const balance = computeBalance(transactions);

        // Build the response object.
        const response = {
            userId: req.body.userId,
            balance: balance
        }

        res.send(response);
    })


    app.post('/balance/debit', payloadValidationMiddleware, errorHandler, async (req: Request, res: Response) => {

        // Fetch all the transactions for the current userId from the database.
        const transactions = await fetchTransactions(pool, req.body.userId);

        // Compute based on the list of debit and credit transactions what is the available balance.
        const balance = computeBalance(transactions);

        // Validate that the user has sufficient balance to process a debit. (if debit amount > available balance, throw an error).
        if (req.body.amount > balance) {
            throw new Error('Insufficient funds for transaction.')
        }

        // Insert the transaction in the database.
        let debit = 'debit';
        await insertTransaction(pool, req.body.userId, req.body.amount, req.body.referenceId, OperationType.DEBIT);

        // Fetch all the transactions for the current userId from the database.
        const transactions2 = await fetchTransactions(pool, req.body.userId);

        // Compute based on the list of debit and credit transactions what is the available balance.
        const balance2 = computeBalance(transactions2);

        // Build the response object.
        const response = {
            userId: req.body.userId,
            balance: balance2
        }

        res.send(response);
    })

    const server = http.createServer(app);

    const start = () => {
        return new Promise<void>((resolve, reject) => {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                resolve();
            });
        });
    }

    const stop = () => {
        return new Promise<void>((resolve, reject) => {
            server.close(err => {
                if (err) return reject();

                console.log(`App closed from http://localhost:${port}`);
                resolve();
            })
            pool.end();
        });
    }

    return {
        start,
        stop,
        port
    }
}
