import 'dotenv/config';
import {createWebServer} from "./create-web-server";

const server = createWebServer();

async () => await server.start();