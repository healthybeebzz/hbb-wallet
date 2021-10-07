import {Pool} from 'pg';

export enum OperationType {
    CREDIT = 'credit',
    DEBIT = 'debit'
}

export const insertTransaction = async (pool: Pool, userId: number, amount: number, referenceId: string, operationType: OperationType) => {
    await pool.query(`INSERT INTO hbb_wallet.transactions(user_id, type, amount, refrence_id)
                VALUES (${userId}, '${operationType}', ${amount}, '${referenceId}')`);
}

export type Transaction = {
    id: number,
    userId: number,
    type: string,
    amount: number,
    referenceId: number,
    createdAt: Date
}

/**
 * Fetches transcations from the table and maps them to DTO (data transfer objects).
 * @param pool
 * @param userId
 */
export const fetchTransactions = async (pool: Pool, userId: number) => {
    const queryResult = await pool.query(`SELECT * FROM hbb_wallet.transactions WHERE user_id=${userId}`);
    const rows = queryResult.rows;

    const resultsArray: Array<Transaction> = [];
    for (let i = 0; i < rows.length; i++) {
        const obj = {
            id: rows[i].id,
            userId: rows[i].user_id,
            type: rows[i].type,
            amount: rows[i].amount,
            referenceId: rows[i].reference_id,
            createdAt: rows[i].created_at
        }

        resultsArray.push(obj);
    }

    return resultsArray;
}