-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).

create table public.enrollments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users on delete cascade not null,

  course_id       int not null,
  course_title    text not null,
  course_ref      text,

  student_name    text not null,
  student_email   text not null,
  student_mobile  text,
  organization    text,
  city            text,
  state           text,
  pincode         text,
  hear_about      text,

  fee             numeric not null,
  gst             numeric not null default 0,
  discount        numeric not null default 0,
  total           numeric not null,

  payment_method  text not null,
  enrollment_id   text not null,
  transaction_id  text not null,
  receipt_no      text not null,

  created_at      timestamptz not null default now()
);

alter table public.enrollments enable row level security;

create policy "Users insert own enrollments"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

create policy "Users view own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

create index enrollments_user_id_idx on public.enrollments (user_id);

create table public.profiles (
  id              uuid references auth.users on delete cascade primary key,

  full_name       text,
  dob             date,
  phone           text,
  organization    text,
  city            text,
  state           text,
  pincode         text,

  updated_at      timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users manage own profile"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);
