import {Pool} from 'pg';

export enum OperationType {
    CREDIT = 'credit',
    DEBIT = 'debit'
}

export const insertTransaction = async (pool: Pool, userId: number, amount: number, referenceId: String, operationType: OperationType) => {
    await pool.query(`INSERT INTO hbb_wallet.transactions(user_id, type, amount, refrence_id)
                VALUES (${userId}, '${operationType}', ${amount}, ${referenceId})`);
}

export const fetchTransactions = async (pool: Pool, userId: number) => {
    const queryResult = await pool.query(`SELECT * FROM hbb_wallet.transactions WHERE user_id=${userId}`);
    return queryResult.rows;
}