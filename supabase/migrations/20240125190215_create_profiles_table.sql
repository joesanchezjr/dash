
-- Create a table for public profiles
create table public.profiles (
  id uuid not null primary key references auth.users(id) on delete cascade,
  updated_at timestamp with time zone,
  username text null unique check ((char_length(username) >= 3)),
  display_name text null,
  avatar_url text null,
  website text null
);
comment on table public.profiles is 'Public user profiles';
comment on column public.profiles.id is 'References the built-in auth user id';

-- Set up Row Level Security (RLS)
-- Reference: https://supabase.com/docs/guides/auth/row-level-security
alter table public.profiles
  enable row level security;

-- create policy "Allow logged-in read access" on public.profiles
--   for select using ( auth.role() = 'authenticated' );
create policy "Allow public read access" on profiles
  for select using (true);
create policy "Allow individual update access" on profiles
  for update to authenticated using ( auth.uid() = id );
create policy "Users can insert their own profile." on profiles
  for insert to authenticated with check ( auth.uid() = id );

-- Send "previous data" on change
alter table public.profiles
  replica identity full;

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.create_profile_for_new_user()
returns trigger as $$
declare 
new_display_name text;
new_avatar_url text;
begin
  select
    case
      when new.raw_app_meta_data ->> 'provider' = 'discord' then new.raw_user_meta_data -> 'custom_claims' ->> 'global_name'
      when new.raw_app_meta_data ->> 'provider' = 'github' then new.raw_user_meta_data ->> 'name'
      when new.raw_app_meta_data ->> 'provider' = 'email' then new.raw_user_meta_data ->> 'display_name'
      else NULL
    end into new_display_name;
  select
    case
      when new.raw_user_meta_data ->> 'avatar_url' is not null then new.raw_user_meta_data ->> 'avatar_url'
      else NULL
    end into new_avatar_url;

  insert into public.profiles(id, display_name, avatar_url)
  values
    (
      new.id,
      new_display_name,
      new_avatar_url
    );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();