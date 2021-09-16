import {expect} from 'chai';
import * as request from 'supertest';
import {createWebServer} from "./create-web-server";


describe('/balance/credit', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();
    });

    after(async () => {
        await server.stop();
    });

    it('given existing balance > when calling POST /balance/credit > should return valid response', async () => {
        const payload = {
            amount: 12,
            userId: 5,
            referenceId: 2323
        };

        const response = await request(`http://localhost:${port}`).post('/balance/credit').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            userId: 5,
            balance: 100
        });
    });
});