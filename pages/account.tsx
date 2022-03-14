import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@/components/button';
import { Subscription } from '@/types/subscription';
import { postData } from '@/utils/http-helpers';
import ProtectedRoute from '@/utils/protected-route';
import { supabaseAdmin } from '@/utils/supabase-admin-client';
import { supabase } from '@/utils/supabase-client';
import { useSession } from '@/utils/user-context';

interface AccountProps {
  subscription: Subscription | null;
}

export default function Account({ subscription }: AccountProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    const { data: { url }, error } = await postData('/api/create-stripe-portal-link',
      {},
      session.access_token
    );

    if (error) {
      // TODO: Add error handling
    }

    router.push(url);
    setLoading(false);
  };

  const subscriptionName = subscription && subscription.prices.products.name;
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription.prices.currency,
      minimumFractionDigits: 0
    }).format(subscription.prices.unit_amount / 100);

  return (
    <section className="mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h2 className="text-4xl font-extrabold text-center">
            Account
          </h2>
          <p className="mt-5 text-xl text-center sm:text-2xl max-w-2xl m-auto">
            We partnered with Stripe for simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">

        <div className="border border-secondary max-w-3xl w-full rounded-md m-auto my-8">
          <div className="px-5 py-4 flex flex-col items-center">
            <h3 className="text-2xl mb-1 font-medium text-center">
              {
                subscriptionName &&
                `You are currently on the ${subscriptionName} plan.`
              }
              {
                !subscriptionName &&
                'You are not subscribed yet.'
              }
            </h3>
            <div className="text-xl mt-4 mb-4 font-bold">
              {
                subscriptionPrice ?
                  `${subscriptionPrice}/${subscription.prices.interval}`
                  :
                  <Link href="/pricing">
                    <a className='uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700'>
                      Choose your plan
                    </a>
                  </Link>
              }
            </div>
            <div>
              {
                subscription && subscription.cancel_at_period_end && subscription.cancel_at &&
                <span className='text-sm'>Subscription ends: {new Date(subscription.cancel_at).toLocaleDateString()}</span>
              }
            </div>
            <div>
              {
                subscription &&
                <Button
                  loading={loading}
                  type='button'
                  disabled={loading || !subscription}
                  className='uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700'
                  onClick={redirectToCustomerPortal}>
                  Manage your subscription on Stripe
                </Button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = (context: GetServerSidePropsContext) =>
  ProtectedRoute(context, null, async () => {
    const { user } = await supabase.auth.api.getUserByCookie(context.req)
    const { data: subscription, error: subscriptionError } = await supabaseAdmin
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .eq('user_id', user.id)
      .single();

    if (subscriptionError) {
      return {};
    }

    return {
      subscription,
    };
  });
