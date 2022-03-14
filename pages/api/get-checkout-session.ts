import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/utils/stripe';
import { supabase } from '@/utils/supabase-client';
import { getOrCreateCustomer } from '@/utils/database';

export default async function createCheckoutSession(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { data: user, error: authError } = await supabase.auth.api.getUserByCookie(req);
      if (authError) {
        return res
          .status(401)
          .end('Unauthorized')
      }

      const { priceId, quantity = 1, metadata = {} } = req.body;
      const customerId = await getOrCreateCustomer(user.id, user.email);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity
          }
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          trial_from_plan: true,
          metadata
        },
        success_url: process.env.NODE_ENV === 'production' ?
          'https://shipsaas-starterkit.vercel.app/account' : // <-- TODO: Add app URL
          'http://localhost:3000/account',
        cancel_url: process.env.NODE_ENV === 'production' ?
          'https://shipsaas-starterkit.vercel.app/' : // <-- TODO: Add app URL
          'http://localhost:3000/'
      });

      return res
        .status(200)
        .json({ sessionId: session.id })

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
