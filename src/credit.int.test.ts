import {expect} from 'chai';
import {default as axios} from 'axios';
import {createWebServer} from "./create-web-server";
import {insertTransaction, OperationType} from "./transactions";
import {connectToDb} from "./db-connection";


describe('/balance/credit', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    let pool= connectToDb();

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();
        await insertTransaction(pool, 980, 500, '143', OperationType.CREDIT);

    });

    after(async () => {
        await pool.query(`DELETE FROM hbb_wallet.transactions WHERE user_id=980`);

        await server.stop();
    });

    it('given existing balance > when calling POST /balance/credit > should return valid response', async () => {
        const payload = {
            amount: 1000,
            userId: 980,
            referenceId: '142'
        };

        const response = await axios.post(`http://localhost:${port}/balance/credit`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            userId: 980,
            balance: 1500
        });
    });
});