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
        await insertTransaction(pool, 987, 500, '123', OperationType.CREDIT);

    });

    after(async () => {
        await server.stop();
    });

    it('given existing balance > when calling POST /balance/credit > should return valid response', async () => {
        const payload = {
            amount: 1000,
            userId: 987,
            referenceId: '132'
        };

        const response = await axios.post(`http://localhost:${port}/balance/credit`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            userId: 987,
            balance: 1500
        });
    });
});