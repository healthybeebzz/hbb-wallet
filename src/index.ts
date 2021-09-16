import dotenv from 'dotenv';
dotenv.config();

import {createWebServer} from "./create-web-server.ts";

const server = createWebServer();

await server.start();