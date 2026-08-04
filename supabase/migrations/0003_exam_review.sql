create table exam_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  score integer not null default 0,
  total_questions integer not null default 0,
  correct_answers integer not null default 0,
  time_seconds integer not null default 0,
  completed_at timestamp default now()
);

create table exam_questions (
  id uuid default gen_random_uuid() primary key,
  exam_attempt_id uuid references exam_attempts on delete cascade,
  question_id text not null,
  selected_answer text,
  correct boolean not null default false,
  answered_at timestamp default now()
);

create table review_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  question_id text not null,
  correct boolean not null default false,
  attempted_at timestamp default now()
);

alter table exam_attempts enable row level security;
alter table exam_questions enable row level security;
alter table review_history enable row level security;

create policy "Users can view their own exam attempts"
on exam_attempts
for select
using (auth.uid() = user_id);

create policy "Users can insert their own exam attempts"
on exam_attempts
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own exam attempts"
on exam_attempts
for update
using (auth.uid() = user_id);

create policy "Users can view questions from their own exam attempts"
on exam_questions
for select
using (
  exists (
    select 1
    from exam_attempts
    where exam_attempts.id = exam_questions.exam_attempt_id
      and exam_attempts.user_id = auth.uid()
  )
);

create policy "Users can insert questions into their own exam attempts"
on exam_questions
for insert
with check (
  exists (
    select 1
    from exam_attempts
    where exam_attempts.id = exam_questions.exam_attempt_id
      and exam_attempts.user_id = auth.uid()
  )
);

create policy "Users can view their own review history"
on review_history
for select
using (auth.uid() = user_id);

create policy "Users can insert their own review history"
on review_history
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own review history"
on review_history
for update
using (auth.uid() = user_id);

create index exam_attempts_user_id_idx on exam_attempts (user_id);
create index exam_attempts_completed_at_idx on exam_attempts (completed_at);
create index exam_questions_exam_attempt_id_idx on exam_questions (exam_attempt_id);
create index review_history_user_id_idx on review_history (user_id);
create index review_history_question_id_idx on review_history (question_id);
