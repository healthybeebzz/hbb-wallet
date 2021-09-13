import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server.js";


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

    it('given existing balance > when calling get /balance/:personId > should return valid response', async () => {
        const payload = {
        };

        const response = await request(`http://localhost:${port}`).get('/balance/1').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            personId: "1",
            balance: "2000"
        });
    });
});