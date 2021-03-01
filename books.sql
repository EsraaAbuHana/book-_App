DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  auther VARCHAR(255),
  title VARCHAR(255),
  isbn numeric,
  image_url TEXT,
  description TEXT
);