-- Table that contains more user details
create table user_details (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  billing_address jsonb,
  payment_method jsonb
  -- expand this table with more user details
);

alter table user_details enable row level security;
create policy "User can view their own data." on user_details for select using (auth.uid() = id);
create policy "User can update their own data." on user_details for update using (auth.uid() = id);

-- Trigger to automatically create a new user details entry when a new user signs up
create function public.handle_new_signup() 
returns trigger as $$
begin
  insert into public.user_details (id, full_name, avatar_url)
  values
  (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;

$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_signup();
