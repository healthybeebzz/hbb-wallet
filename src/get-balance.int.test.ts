import {expect} from 'chai';
import * as request from 'supertest';
import {createWebServer} from "./create-web-server";
import {insertTransaction, OperationType} from "./transactions";
import {connectToDb} from "./db-connection";


describe('/balance/:personId', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    const pool = connectToDb();

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();

        await insertTransaction(pool, 987, 100, '123', OperationType.CREDIT);
    });

    after(async () => {
       await server.stop();

       await pool.query(`DELETE FROM hbb_wallet.transactions WHERE refrence_id='123'`);
    });

    it('given existing balance > when calling GET /balance/:userId > should return valid response', async () => {
        const response = await request(`http://localhost:${port}`).get('/balance/987').send();

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            userId: '987',
            balance: 100
        });
    });
});