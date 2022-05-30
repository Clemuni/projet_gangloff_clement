begin;
set transaction read write;

DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Product;

CREATE TABLE Client(
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(48),
    first_name VARCHAR(48),
    username VARCHAR(48) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(256)
);

CREATE TABLE Product(
    id SERIAL PRIMARY KEY,
    label VARCHAR(32),
    price INTEGER,
    quantity INTEGER
);

INSERT INTO Product (label, price, quantity)
VALUES ('Salade 🥗', 1.99, 0),
    ('Tomate 🍅', 2.99, 0),
    ('Oignon 🧅', 0.99, 0),
    ('Sauce blanche 🍯', 5.99, 0);

COMMIT;