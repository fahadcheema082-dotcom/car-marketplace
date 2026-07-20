-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

create table listings (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  year int not null,
  price numeric not null,
  mileage numeric not null,
  transmission text not null,
  fuel_type text not null,
  location text not null,
  contact_phone text,
  contact_email text,
  description text,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Allow anyone to read listings (public marketplace)
alter table listings enable row level security;

create policy "Public listings are viewable by everyone"
  on listings for select
  using (true);

create policy "Anyone can add a listing"
  on listings for insert
  with check (true);

-- Storage bucket for car photos:
-- Go to Supabase Dashboard > Storage > Create bucket named "car-images" and set it to Public
