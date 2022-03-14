-- Table that contains Stripe product data - synced to the DB via Stripe webhooks
create table products (
  -- Product ID from Stripe
  id text primary key,
  active boolean,
  name text,
  description text,
  -- Product image URl in Stripe
  image text,
  -- Set of key-value pairs to store additional information
  metadata jsonb
);

alter table products enable row level security;
create policy "Anyone can view products" on products for select using (true);