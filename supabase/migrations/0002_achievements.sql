create table achievements (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  icon text,
  created_at timestamp default now()
);

create table user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  achievement_id uuid references achievements on delete cascade,
  unlocked_at timestamp default now()
);

alter table achievements enable row level security;
alter table user_achievements enable row level security;

create policy "Anyone can view achievements"
on achievements
for select
using (true);

create policy "Users can view their achievements"
on user_achievements
for select
using (auth.uid() = user_id);

create policy "Users can unlock achievements"
on user_achievements
for insert
with check (auth.uid() = user_id);
