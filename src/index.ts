import dotenv from 'dotenv';
dotenv.config();

import {createWebServer} from "./create-web-server";

const server = createWebServer();

await server.start();