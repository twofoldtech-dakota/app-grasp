-- Table that contains a mapping of user ID to Stripe customer ID
create table stripe_customers (
  user_id uuid references auth.users not null primary key,
  stripe_customer_id text
);

alter table stripe_customers enable row level security;
