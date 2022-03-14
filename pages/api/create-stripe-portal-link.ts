import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/utils/stripe';
import { supabase } from '@/utils/supabase-client';
import { getOrCreateCustomer } from '@/utils/database';

export default async function createPortalLink(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { data: user, error } = await supabase.auth.api.getUserByCookie(req);
      if (error) {
        return res
          .status(401)
          .end('Unauthorized')
      }

      const customerId = await getOrCreateCustomer(user.id, user.email);
      const { url } = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: process.env.NODE_ENV === 'production' ?
          'https://shipsaas-starterkit.vercel.app/account' : // <-- TODO: Add app URL
          'http://localhost:3000/account'
      });

      return res
        .status(200)
        .json({ url })

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
