-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database
-- Create users table
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  password_hash varchar(50) NOT NULL,
  created_at timestamp,
  updated_at timestamp
);

INSERT INTO
  users (
    first_name,
    last_name,
    email,
    password_hash,
    created_at,
    updated_at
  )
VALUES
  (
    'Cornelia',
    'Schenk',
    'cornelia.schenk@hotmail.com',
    'test'
  )
