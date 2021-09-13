import http from 'http';
import express from 'express';
import bodyParser from 'express';

export const createWebServer = () => {
    const app = express();

    const port = 3000;

    app.use(bodyParser.json());

    app.get('/balance/:personId', (req, res) => {
        const personId = req.params.personId;

        const response = {
            personId,
            balance: "2000"
        }
        res.send(response);
    });

    app.post('/balance/:personId/:credit', (req, res) => {
        if (!req.body.amount) throw new Error('The `amount` field is not present in the payload.');
        if (!req.body.userId) throw new Error('The `userId` field  is not present in the payload.');
        if (!req.body.referenceId) throw new Error('The `referenceId` field  is not present in the payload.');

        const personId = req.params.personId;
        const credit = req.params.credit;
        const balance = 10;


        const response = {
            personId,
            balance: balance + credit
        }
        res.send(response);
    })


    app.post('/balance/:personId/:debit', (req, res) => {
        if (!req.body.amount) throw new Error('The `amount` field is not present in the payload.');
        if (!req.body.userId) throw new Error('The `userId` field  is not present in the payload.');
        if (!req.body.referenceId) throw new Error('The `referenceId` field  is not present in the payload.');

        const personId = req.body.personId;
        const debit = req.body.debit;
        const balance = 10;

        const response = {
            personId,
            balance: balance - debit
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
        });
    }

    return {
        start,
        stop,
        port
    }
}
