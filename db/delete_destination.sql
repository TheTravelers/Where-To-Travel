
delete from saved_destinations
where saved_dest_id = $2;

select * from saved_destinations
where user_id = $1;