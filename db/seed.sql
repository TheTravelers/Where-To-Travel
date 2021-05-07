create table users (
user_id serial primary key,
email varchar(255),
hash text,
name varchar(55),
profile_pic text
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
family_friendly boolean,
city_img text,
state char(2)
)

create table default_destinations (
default_dest_id serial primary key,
city_name varchar(255),
city_img text,
population bigint, 
waterfront boolean,
adult_friendly boolean,
family_friendly boolean,
state char(2)
)

insert into default_destinations (city_name, state, city_img, population, waterfront, adult_friendly, family_friendly)
values
('Chicago', 'IL', 'https://media.timeout.com/images/105483069/750/422/image.jpg', 2670406, true, true, true),
('New Orleans', 'LA', 'https://media.timeout.com/images/105483062/750/422/image.jpg', 388424, true, true, false),
('Nashville', 'TN', 'https://media.timeout.com/images/105483074/750/422/image.jpg', 678448, false, true, true ),
('Los Angeles', 'CA', 'https://media.timeout.com/images/105483063/750/422/image.jpg', 4085014, true, true, true),
('New York City', 'NY', 'https://media.timeout.com/images/105483061/750/422/image.jpg', 8622357, true, true, false),
('Las Vegas', 'NV', 'https://media.timeout.com/images/105483066/1024/576/image.jpg', 2699000, false , true , false),
('St. Louis', 'MO', 'https://media.timeout.com/images/105483075/1024/576/image.jpg', 308174,true,true,true),
('Washington', 'DC', 'https://media.timeout.com/images/105483064/1024/576/image.jpg', 7615000, true, true, true),
('Miami', 'FL', 'https://media.timeout.com/images/105483068/1024/576/image.jpg', 533945,true, true, false ),
('Boston', 'MA', 'https://media.timeout.com/images/105483072/1024/576/image.jpg', 695506, true, true, true )

ALTER TABLE users 
ADD COLUMN profile_pic TEXT

