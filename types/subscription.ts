import { Price } from './price';

export type Subscription = {
  id: string;
  user_id: string;
  status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid'
  price_id: string;
  quantity: number;
  cancel_at_period_end: boolean;

  created: Date;
  current_period_start: Date;
  current_period_end: Date;

  ended_at: Date;
  cancel_at: Date;
  canceled_at: Date;
  metadata: string;

  trial_start: Date;
  trial_end: Date;

  prices?: Price;
}
