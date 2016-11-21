-- Database name
Sigma
-- Document your create tables SQL here
CREATE TABLE treats(
id SERIAL PRIMARY KEY,
name VARCHAR(80),
description TEXT,
pic VARCHAR(500)
);

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg'),
('Goldfish', 'Tasty fish shaped crackers', '/assets/goldfish.jpg'),
('Ice Cream', 'What more can you say?', '/assets/icecream.jpg'),
('Potato', 'Undisputed treat champion', '/assets/potato.jpg');

SELECT *
FROM treats;
