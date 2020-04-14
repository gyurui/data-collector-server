CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO users (name, title)
VALUES  ('Test User', 'Student');