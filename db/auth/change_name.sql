UPDATE users
SET name = $1
WHERE user_id = $2;
SELECT * FROM users 
WHERE user_id = $2;