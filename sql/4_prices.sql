-- Table that contains Stripe product pricing data - synced to the DB via Stripe webhooks

create type pricing_type as enum ('one_time', 'recurring');
create type pricing_plan_interval as enum ('month', 'year');
create table prices (
  id text primary key,
  product_id text references products, 
  active boolean,
  description text,
  -- The unit amount as a positive integer in the smallest currency unit
  unit_amount bigint,
  -- Three-letter ISO currency code in lowercase
  currency text check (char_length(currency) = 3),
  type pricing_type,
  interval pricing_plan_interval,
  -- The number of intervals between subscription billings. 
  -- E.g. `interval=month` and `interval_count=3` is billed every 3 months.
  interval_count integer,
  -- Number of trial days when subscribing a customer to this price 
  -- using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
  trial_period_days integer,
  -- Set of key-value pairs to store additional information
  metadata jsonb
);

alter table prices enable row level security;
create policy "Anyone can view prices" on prices for select using (true);
