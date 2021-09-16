import * as pg from "pg";

// Establish connection to db
export const connectToDb = () =>  {
    return new pg.Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT)
    });
}