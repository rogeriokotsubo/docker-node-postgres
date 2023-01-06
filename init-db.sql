CREATE TABLE users
(
    id SERIAL,
    name text,
    email text,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO users(name, email) VALUES
 ('Rogerio', 'rogerio@gmail.com'),
 ('Rogerio1', 'rogerio1@gmail.com'),
 ('Rogerio2', 'rogerio2@gmail.com');