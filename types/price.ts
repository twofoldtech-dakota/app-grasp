import { Product } from './product';

export type Price = {
  id: string;
  product_id: string;
  active: boolean
  description: string;
  unit_amount: number;
  currency: string;
  type: 'one_time' | 'recurring';
  interval: 'month' | 'year';
  interval_count: number;
  trial_period_days: number;
  metadata: string;

  products?: Product;
}
