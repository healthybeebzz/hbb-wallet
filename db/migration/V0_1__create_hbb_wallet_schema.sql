CREATE SCHEMA IF NOT EXISTS hbb_wallet;

CREATE TYPE transaction_type as ENUM('credit', 'debit');

CREATE TABLE IF NOT EXISTS hbb_wallet.transactions (
    id BIGSERIAL not null primary key,
    user_id INT not null,
    type transaction_type not null,
    amount INT not null,
    refrence_id TEXT not null,
    created_at timestamp default now() not null
);

CREATE INDEX IF NOT EXISTS transactions_user_id_index ON hbb_wallet.transactions(user_id);
