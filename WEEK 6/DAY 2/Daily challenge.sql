-- 1. Setup the Schema and Data
CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
(5, 'Pawan'),
(6, 'Sharlee'),
(7, 'Krish'),
(NULL, 'Avtaar');

CREATE TABLE SecondTab (
    id integer 
);

INSERT INTO SecondTab (id) VALUES
(5),
(NULL);

-- 2. Execute the Questions

-- Q1: NOT IN (NULL)
-- Predicted Output: 0
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL );

-- Q2: NOT IN (5)
-- Predicted Output: 2
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 );

-- Q3: NOT IN (5, NULL)
-- Predicted Output: 0
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab );

-- Q4: NOT IN (5) where subquery is cleaned of NULLs
-- Predicted Output: 2
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL );


    

