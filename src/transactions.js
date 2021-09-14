export const insertTransaction = async (pool, userId, amount, referenceId, operationType) => {
    await pool.query(`INSERT INTO hbb_wallet.transactions(user_id, type, amount, refrence_id)
                VALUES (${userId}, '${operationType}', ${amount}, ${referenceId})`);
}

export const fetchTransactions = async (pool, userId) => {
    const queryResult = await pool.query(`SELECT * FROM hbb_wallet.transactions WHERE user_id=${userId}`);
    return queryResult.rows;
}