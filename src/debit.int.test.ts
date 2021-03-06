import {expect} from 'chai';
import {default as axios} from 'axios';
import {createWebServer} from "./create-web-server";
import {insertTransaction, OperationType} from "./transactions";
import {connectToDb} from "./db-connection";


describe('/balance/debit', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    let pool = connectToDb();

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();
        await insertTransaction(pool, 15, 1000, '123', OperationType.CREDIT);
    });

    after(async () => {

        await pool.query(`DELETE FROM hbb_wallet.transactions WHERE refrence_id='123'`);

        await server.stop();
    });

    it('given existing balance > when calling POST /balance/debit > should return valid response', async () => {
        const payload = {
            amount: 400,
            userId: 15,
            referenceId: '143'
        };

        const response = await axios.post(`http://localhost:${port}/balance/debit`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            userId: 15,
            balance: 600
        });
    });

    it('given existing balance > when calling POST /balance/debit > should return valid response', async () => {
        const payload = {
            amount: 1100,
            userId: 15,
            referenceId: '144'
        };

        const response = await axios.post(`http://localhost:${port}/balance/debit`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            userId: 15,
            balance: -100
        });
    });
});