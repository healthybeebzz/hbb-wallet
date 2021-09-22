import * as pg from "pg";
import {config} from "./config";

// Establish connection to db
export const connectToDb = () =>  {
    return new pg.Pool({
        user: config.dbUser,
        host: config.dbHost,
        database: config.databaseName,
        password: config.dbPassword,
        port: config.dbPort
    });
}