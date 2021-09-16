import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server";


describe('/balance/:personId', () => {
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

    it('given existing balance > when calling GET /balance/:userId > should return valid response', async () => {
        const response = await request(`http://localhost:${port}`).get('/balance/1').send();

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            userId: '1',
            balance: 100
        });
    });
});