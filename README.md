# hbb-wallet
 
#### Table balance - with credit and debit operations
- get balance
- credit balance
- debit balance

### hbb-wallet API contract:

POST /credit/
- payload:
    - userId
    - amount
    - referenceId
-> the request handler will validate that these three properties exist on the payload
-> the request handler will insert an entry into the transactions table from the DB

POST /debit/
- payload:
    - userId
    - amount
    - referenceId
-> the request handler will validate that these three properties exist on the payload
-> the request handler will fetch all the transactions from the DB, and compute what is the available balance of the user
	-> if the balance is greater than the debited amount, process the request
	-> if the balance is less than the debited amount, thrown an `new Error(‘insufficient funds”);
-> the request handler will insert an entry into the transactions table from the DB


GET /balance/:userId
- no payload as its a GET request
-> the request handler will select all the transactions from the database
-> the request handler will compute if the available balance
-> the request handler will return as response the available balance

