import {expect} from 'chai';
import {default as axios} from 'axios';
import {createWebServer} from "./create-web-server";


describe('/balance/debit', () => {
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

    it('given existing balance > when calling POST /balance/debit > should return valid response', async () => {
        const payload = {
            amount: 12,
            userId: 5,
            referenceId: 2323
        };

        const response = await axios.post(`http://localhost:${port}/balance/debit`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            userId: 5,
            balance: 100
        });
    });
});