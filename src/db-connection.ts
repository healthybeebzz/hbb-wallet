// Establish connection to db
import pg from "pg";

export const connectToDb = () =>  {
    const pool = new pg.Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    })
    return pool;
}