
DROP DATABASE IF EXISTS budget;
CREATE DATABASE budget;

\c budget;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL UNIQUE,
  full_name VARCHAR NOT NULL,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  weekly_salary INTEGER,
  goal_amount INTEGER,
  weekly_contribution INTEGER,
  current_amount INTEGER,
  complete BOOLEAN
);

INSERT INTO users (email, username, full_name, password_digest) VALUES ('gloria@mail.com', 'gewashington', 'Gloria Washington', '$2a$10$DJ1.rBa4/w0cF8GgoAfoK.R75NTUQRxo.Me.WlKepfRKYrthFQrnC');

INSERT INTO goals (user_id, weekly_salary, goal_amount, weekly_contribution, current_amount, complete) VALUES (1, 1000, 5000, 150, 0, false);