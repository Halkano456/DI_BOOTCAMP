-- database/schema.sql

-- 1. Create Users (with Credit logic)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(100),
    credits INT DEFAULT 20,
    avatar TEXT
);

-- 2. Create Skills
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

-- 3. The Link (What I HAVE vs what I WANT)
CREATE TABLE user_skills (
    user_id INT REFERENCES users(id),
    skill_id INT REFERENCES skills(id),
    is_teaching BOOLEAN -- TRUE if they offer it, FALSE if they seek it
);

-- 4. SEED DATA (Important for the demo!)
INSERT INTO skills (name) VALUES ('Node.js'), ('UI Design'), ('PostgreSQL'), ('React.js'), ('Python');

INSERT INTO users (name, role, credits) VALUES ('Aisha K.', 'Full-Stack Developer', 28);
INSERT INTO users (name, role, credits) VALUES ('Ben L.', 'UI/UX Designer', 15);

-- Aisha teaches Node (1), seeks UI Design (2)
INSERT INTO user_skills (user_id, skill_id, is_teaching) VALUES (1, 1, true), (1, 2, false);
-- Ben teaches UI Design (2), seeks Node (1) -> A PERFECT MATCH!
INSERT INTO user_skills (user_id, skill_id, is_teaching) VALUES (2, 2, true), (2, 1, false);