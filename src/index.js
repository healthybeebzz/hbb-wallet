import dotenv from 'dotenv';
dotenv.config();

import {createWebServer} from "./create-web-server.js";

const server = createWebServer();

await server.start();