export const computeBalance = (transactions) => {
    let balance = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'credit'){
            balance += transactions[i].amount;
            console.log("balance in for ", balance);
        } else if (transactions[i].type === 'debit'){
            balance -= transactions[i].amount;
        }
    }
    return balance;
}
