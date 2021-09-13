import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server.js";


describe('/balance/:personId/:credit', () => {
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

    it('given existing balance > when calling get /balance/:personId/:credit > should return valid response', async () => {
        const payload = {
            amount: 12,
            userId: 5,
            referenceId: 2323
        };

        const response = await request(`http://localhost:${port}`).post('/balance/1/20').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            personId: "1",
            balance: "1020"
        });
    });
});