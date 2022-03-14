import { NextApiRequest, NextApiResponse } from 'next';
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  deletePriceRecord,
  upsertProductRecord,
  deleteProductRecord,
  deleteCustomer,
  updateUserDetails,
} from '@/utils/database';
import { stripe } from '@/utils/stripe';

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false
  }
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    );
  }
  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'product.deleted',
  'price.created',
  'price.updated',
  'price.deleted',
  'checkout.session.completed',
  'customer.deleted',
  'customer.updated',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export default async function WebhookHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'];
    const webhookSecret =
      process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
      process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;

    try {
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
      console.log(`Event received: ${event.type}`)
    } catch (err) {
      console.error(`Error message: ${err.message}`);
      return res
        .status(400)
        .send(`Webhook Error: cannot construct Stripe event. Check logs for more info.`);
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'product.created':
          case 'product.updated':
            await upsertProductRecord(event.data.object);
            break;
          case 'product.deleted':
            await deleteProductRecord(event.data.object);
            break;
          case 'price.created':
          case 'price.updated':
            await upsertPriceRecord(event.data.object);
            break;
          case 'price.deleted':
            await deletePriceRecord(event.data.object);
            break;
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            await manageSubscriptionStatusChange(
              event.data.object.id,
              event.data.object.customer,
              event.type === 'customer.subscription.created'
            );
            break;
          case 'checkout.session.completed':
            const checkoutSession = event.data.object;
            if (checkoutSession.mode === 'subscription') {
              await manageSubscriptionStatusChange(
                checkoutSession.subscription,
                checkoutSession.customer,
                true
              );
            }
            break;
          case 'customer.updated':
            await updateUserDetails(
              event.data.object.id,
              event.data.object.address,
              event.data.object.invoice_settings?.default_payment_method,
            );
            break;
          case 'customer.deleted':
            await deleteCustomer(event.data.object.id);
            break;
          default:
            console.error('Unknown event type to process.');
            return res
              .status(400)
              .send("Unknown event type to process.");

        }
      } catch (error) {
        console.error(error);
        return res
          .status(400)
          .send("Failed to handle webhook. Check the logs for more info.");
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
