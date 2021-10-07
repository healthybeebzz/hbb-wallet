import {createWebServer} from "./create-web-server";

const server = createWebServer();

const startServer = async () => {
    await server.start()
}

startServer();