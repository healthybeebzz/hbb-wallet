import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server.js";


describe('/balance/debit', () => {
    let port;
    let server;

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();
    });

    after(async () => {
        await server.stop();
    });

    it('given existing balance > when calling post /balance/debit > should return valid response', async () => {
        const payload = {
            amount: 12,
            userId: 5,
            referenceId: 2323
        };

        const response = await request(`http://localhost:${port}`).post('/balance/debit').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            userId: 5,
            balance: 100
        });
    });
});