create table users (
user_id serial primary key,
email varchar(255),
hash text,
name varchar(55)
)

create table user_filter(
user_filter_id serial primary key,
user_id int references users(user_id),
user_location varchar(255),
travel_distance int,
waterfront_only boolean,
stay_in_state boolean,
urban_areas boolean,
rural_areas boolean,
adult_activities_nearby boolean,
family_activities_nearby boolean
)

create table saved_destinations (
saved_dest_id serial primary key,
user_id int references users(user_id),
city_name varchar(255),
population bigint, 
waterfront boolean,
adult_friendly boolean,
family_friendly boolean
)

