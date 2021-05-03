UPDATE users
SET profile_pic = $1
WHERE user_id = $2;
SELECT * FROM users 
WHERE user_id = $2;