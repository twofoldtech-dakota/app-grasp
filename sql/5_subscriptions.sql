-- Table that contains Stripe subscription data - synced to the DB via Stripe webhooks

create type subscription_status as enum 
(
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid'
);

create table subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status subscription_status,
  price_id text references prices,
  -- Quantity multiplied by the unit amount of the price creates the amount of the subscription.
  -- Can be used to charge multiple seats.
  quantity integer,
  -- If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancel_at_period_end boolean,

  -- Time at which the subscription was created.
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Start of the current period that the subscription has been invoiced for.
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  -- End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  -- If the subscription has ended, the timestamp of the date the subscription ended.
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  -- A date in the future at which the subscription will automatically get canceled.
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  -- If the subscription has been canceled, the date of that cancellation.
  -- If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request,
  -- not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  -- Set of key-value pairs to store additional information
  metadata jsonb,

  -- If the subscription has a trial - trail start date
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  -- If the subscription has a trial - trail end date
  trial_end timestamp with time zone default timezone('utc'::text, now())
);

alter table subscriptions enable row level security;
create policy "User can view their own data." on subscriptions for select using (auth.uid() = user_id);
