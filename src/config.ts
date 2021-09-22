/**
 * This module is the sole entity that's responsible with accessing the environment.
 */
export const config = {
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST,
    databaseName: process.env.DB_DATABASE,
    dbPassword: process.env.DB_PASS,
    dbPort: Number(process.env.DB_PORT)
}
