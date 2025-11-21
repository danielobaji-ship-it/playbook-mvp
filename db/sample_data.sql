-- db/sample_data.sql
-- Sample users
insert into users_custom (id, role, name) values
  (gen_random_uuid(), 'player', 'Devon K.'),
  (gen_random_uuid(), 'player', 'Aisha M.'),
  (gen_random_uuid(), 'player', 'Luis R.'),
  (gen_random_uuid(), 'coach', 'Coach Sam'),
  (gen_random_uuid(), 'coach', 'Coach Lynn');

-- Sample profiles (example uses first player row; adjust later)
insert into profiles (user_id, age, position, club, stats, video_url)
select id, 16, 'Forward', 'Northside FC', '{"goals":5,"assists":2}', 'https://youtu.be/dummy'
from (select id from users_custom where role='player' limit 1) as p1;

-- Example tryout
insert into tryouts (org, date, location, description)
values ('Northside FC', '2025-12-10', 'GTA Field 1', 'Open tryout for U18 forwards');

-- Example messages (no sender_auth yet)
insert into messages (sender_id, receiver_id, body)
values
  (NULL, NULL, 'test realtime message'),
  (NULL, NULL, 'test realtime message');
