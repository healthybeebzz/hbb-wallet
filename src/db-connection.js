// Establish connection to db
import pg from "pg";


export const connectToDb = () =>  {
    const pool = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432
    })
    return pool;
}