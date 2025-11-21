-- db/schema.sql
-- Users (linking to auth user IDs)
create table if not exists users_custom (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('player','coach','admin')),
  name text,
  created_at timestamptz default now()
);

-- Player profiles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users_custom(id) on delete cascade,
  age int,
  position text,
  club text,
  stats jsonb,
  video_url text,
  created_at timestamptz default now()
);

-- Tryouts / opportunities
create table if not exists tryouts (
  id uuid primary key default gen_random_uuid(),
  org text,
  date date,
  location text,
  description text,
  created_at timestamptz default now()
);

-- Messages (basic)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid,    -- legacy / optional field
  receiver_id uuid,  -- legacy / optional field
  body text,
  created_at timestamptz default now()
);
