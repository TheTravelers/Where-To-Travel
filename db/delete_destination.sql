-- select user_id from saved_destinations
-- where saved_dest_id = $1;

delete from saved_destinations
where saved_dest_id = $1;