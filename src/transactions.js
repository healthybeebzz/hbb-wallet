export const insertTransactionCredit = async (pool, userId, amount, referenceId) => {
    await pool.query(`INSERT INTO hbb_wallet.transactions(user_id, type, amount, refrence_id)
                VALUES (${userId}, 'credit', ${amount}, ${referenceId})`);
}

export const insertTransactionDebit = async (pool, userId, amount, referenceId) => {
    await pool.query(`INSERT INTO hbb_wallet.transactions(user_id, type, amount, refrence_id)
                VALUES (${userId}, 'debit', ${amount}, ${referenceId})`);
}

export const fetchTransactions = async (pool, userId) => {
    const queryResult = await pool.query(`SELECT * FROM hbb_wallet.transactions WHERE user_id=${userId}`);
    console.log("queryResult ", queryResult);
    console.log("queryResult.rows", queryResult.rows);
    const transactions = queryResult.rows;
    return transactions;
}