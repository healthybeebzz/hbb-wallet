import http from 'http';
import express from 'express';
import bodyParser from 'express';
import {connectToDb} from './db-connection.js'
import {computeBalance} from "./compute-balance.js";

export const createWebServer = () => {
    const pool = connectToDb();
    const app = express();


    const port = 3000;

    app.use(bodyParser.json());

    app.get('/balance/:userId', (req, res) => {
        if (!req.params.userId) throw new Error('The `userId` parameter is not present.');

        const userId = req.params.userId;

        pool.query("SELECT * FROM hbb_wallet.transactions WHERE user_id=" + userId, (err, res) => {

            if (err) console.log('err', err);
        })

            const response = {
            userId,
            balance: 100
        }

        res.send(response);
    });

    app.post('/balance/credit', async (req, res) => {
        if (!req.body.amount) throw new Error('The `amount` field is not present in the payload.');
        if (!req.body.userId) throw new Error('The `userId` field  is not present in the payload.');
        if (!req.body.referenceId) throw new Error('The `referenceId` field  is not present in the payload.');

        // Insert the transaction in the database.
        pool.query(`INSERT INTO hbb_wallet.transactions(user_id, type, amount, refrence_id)
                VALUES (${req.body.userId}, 'credit', ${req.body.amount}, ${req.body.referenceId})`, (err, res) => {

            if (err) console.log('err', err);
        })

        // Fetch all the transactions for the current userId from the database.
        const queryResult = await pool.query(`SELECT * FROM hbb_wallet.transactions WHERE user_id=${req.body.userId}`);
        const transactions = queryResult.rows;

        // Compute based on the list of debit and credit transactions what is the available balance.
        const balance = computeBalance(transactions);

        // Build the response object.
        const response = {
            userId: req.body.userId,
            balance: balance
        }

        res.send(response);
    })


    app.post('/balance/debit', async (req, res) => {
        if (!req.body.amount) throw new Error('The `amount` field is not present in the payload.');
        if (!req.body.userId) throw new Error('The `userId` field  is not present in the payload.');
        if (!req.body.referenceId) throw new Error('The `referenceId` field  is not present in the payload.');

        // Fetch all the transactions for the current userId from the database.
        const queryResult = await pool.query(`SELECT * FROM hbb_wallet.transactions WHERE user_id=${req.body.userId}`);
        const transactions = queryResult.rows;

        // Compute based on the list of debit and credit transactions what is the available balance.
        const balance = computeBalance(transactions);

        // Validate that the user has sufficient balance to process a debit. (if debit amount > available balance, throw an error).
        if (req.body.amount > balance) {
            throw new Error('Insufficient funds for transaction.')
        }

        // Insert the transaction in the database.
        pool.query(`INSERT INTO hbb_wallet.transactions(user_id, type, amount, refrence_id)
                VALUES (${req.body.userId}, 'debit', ${req.body.amount}, ${req.body.referenceId})`, (err, res) => {

            if (err) console.log('err', err);
        })

        // Build the response object.
        const response = {
            userId: req.body.userId,
            balance: balance
        }

        res.send(response);
    })

    const server = http.createServer(app);

    const start = () => {
        return new Promise((resolve, reject) => {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                resolve();
            });
        });
    }

    const stop = () => {
        return new Promise((resolve, reject) => {
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
