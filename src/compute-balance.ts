import {Transaction} from "./transactions";


export const computeBalance = (transactions: Array<Transaction> = []) => {
    let balance = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'credit'){
            balance += transactions[i].amount;
        } else if (transactions[i].type === 'debit'){
            balance -= transactions[i].amount;
        }
    }
    return balance;
}
