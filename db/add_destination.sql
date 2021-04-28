insert into saved_destinations (user_id, city_name, population, waterfront, adult_friendly, family_friendly)
values
($1, $2, $3, $4, $5, $6)
returning *;