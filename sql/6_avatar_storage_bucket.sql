-- Create storage bucket
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

-- Create bucket policies
create policy "Anyone can view all avatar images"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "User can upload their own avatar"
  on storage.objects for insert
  with check ( 
    bucket_id = 'avatars'
    and auth.uid() = owner
  );

create policy "User can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid() = owner
  );
  