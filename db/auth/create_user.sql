insert into users
(email, hash, name)
values
($1, $2, $3)
returning *;