create table lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  lesson_id text not null,
  completed boolean default false,
  score integer default 0,
  completed_at timestamp default now()
);

alter table lesson_progress enable row level security;

create policy "Users can view their own progress"
on lesson_progress
for select
using (auth.uid() = user_id);

create policy "Users can insert their own progress"
on lesson_progress
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own progress"
on lesson_progress
for update
using (auth.uid() = user_id);
