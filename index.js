import express from 'express';
import bodyParser from 'express';

const app = express();

const port = 3000;

app.use(bodyParser.json())

app.get('/balance/:personId', (req, res) => {
    const personId = req.params.personId;

    const response = {
        personId,
        balance: "2000"
    }
    res.send(response);
});

app.post('/balance/:personId/credit', (req, res) => {
    const personId = req.body.personId;
    const credit = req.body.credit;
    const balance = req.body.balance;

    const response = {
        personId,
        balance: balance + credit
    }
    res.send(response);
})


app.post('/balance/:personId/debit', (req, res) => {
    const personId = req.body.personId;
    const debit = req.body.debit;
    const balance = req.body.balance;

    const response = {
        personId,
        balance: balance - debit
    }
    res.send(response);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});