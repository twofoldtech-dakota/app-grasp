import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/utils/supabase-admin-client';
import { supabase } from '@/utils/supabase-client';

export default async function getSubscription(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data: user, error } = await supabase.auth.api.getUserByCookie(req);
      if (error) {
        return res
          .status(401)
          .end('Unauthorized')
      }

      const { data: subscription, error: subscriptionError } = await supabaseAdmin
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .eq('user_id', user.id)
        .single();

      if (subscriptionError) {
        return res
          .status(404)
          .json({ error: { statusCode: 404, message: 'Subscription not found.' } })
      }

      return res
        .status(200)
        .json({ subscription })

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
