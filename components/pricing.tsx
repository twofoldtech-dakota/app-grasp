import { useRouter } from 'next/router';
import { useState } from 'react';
import { postData } from '@/utils/http-helpers';
import { getStripe } from '@/utils/stripe-client';
import { useSession, useSubscription } from '@/utils/user-context';
import Button from './button';

// TODO: Add your Stripe price IDs here
const priceIds = {
  basicMonthly: process.env.NEXT_PUBLIC_PRICE_BASIC_MONTHLY ?? '',
  basicYearly: process.env.NEXT_PUBLIC_PRICE_BASIC_YEARLY ?? '',
  professionalMonthly: process.env.NEXT_PUBLIC_PRICE_PRO_MONTHLY ?? '',
  professionalYearly: process.env.NEXT_PUBLIC_PRICE_PRO_YEARLY ?? '',
}

export default function Pricing() {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('year');
  const [priceIdLoading, setPriceIdLoading] = useState('');
  const [priceError, setPriceError] = useState({ priceId: '', message: '' });
  const session = useSession();
  const subscription = useSubscription();

  const handleCheckout = async (priceId: string) => {
    setPriceIdLoading(priceId);

    if (!session) {
      return router.push('/signin?returnUrl=/pricing')
    }

    if (subscription) {
      return router.push('/account');
    }

    try {
      const { data } = await postData<{ sessionId: string }>('/api/get-checkout-session', { priceId });
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      setPriceError({
        priceId: priceId,
        message: `
        This is a demo application. The real Stripe price ID's are not configured.
        This action would redirect a user to Stripe where they can start/manage their subscription.`
      });
    } finally {
      setPriceIdLoading('');
    }
  };
  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          Pricing
        </h2>
        <div className="relative self-center mt-6 bg-white rounded-lg p-1 flex border border-white">
          <button
            onClick={() => setBillingInterval('month')}
            type="button"
            className={`border border-gray-300 border-solid rounded-md m-1 px-8 py-2 text-sm whitespace-nowrap focus:outline-none focus:z-5
            ${billingInterval === 'month' ?
                'ml-1 relative w-1/2 text-white font-bold bg-primary-500' :
                'relative w-1/2 bg-white text-black shadow-sm'}
                `}>
            Monthly billing
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            type="button"
            className={`border border-gray-300 border-solid rounded-md m-1 px-8 py-2 text-sm whitespace-nowrap focus:outline-none focus:z-5
            ${billingInterval === 'year' ?
                'ml-1 relative w-1/2 text-white font-bold bg-primary-500' :
                'relative w-1/2 bg-white text-black shadow-sm'}
               `}>
            Yearly billing
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:justify-center w-full lg:px-10 py-8">
        <div className="bg-white text-black w-4/5 lg:w-custom mb-10 lg:px-4 px-6 py-10 text-center rounded-lg">
          <h5 className="font-bold text-base">Basic</h5>
          <h2 className="pb-4 flex justify-center font-bold border-b border-gray-300">
            <span className="text-3xl mt-6 mr-1">$</span>
            <span className="text-6xl">{billingInterval === 'month' ? '19.99' : '199.99'}</span>
          </h2>
          <ul className="text-sm font-bold">
            <li className="pt-4 pb-4 border-b border-gray-300">500 GB Storage</li>
            <li className="pt-3 pb-4 border-b border-gray-300">1 User allowed</li>
            <li className="pt-4 pb-4 border-b border-gray-300">Limited features</li>
          </ul>
          <Button
            type="button"
            disabled={false}
            loading={priceIdLoading === priceIds.basicMonthly || priceIdLoading === priceIds.basicYearly}
            onClick={() => handleCheckout(billingInterval === 'month' ? priceIds.basicMonthly : priceIds.basicYearly)}
            className="uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700">
            {
              subscription ?
                'Manage account'
                :
                'Subscribe'
            }
          </Button>
          {
            (priceError.priceId === priceIds.basicMonthly || priceError.priceId === priceIds.basicYearly) && priceError.message &&
            <div className='mt-4 text-gray-900 text-center border border-gray-400 border-solid p-3 rounded-lg'>
              {priceError.message}
            </div>
          }
        </div>
        <div
          className="lg:w-custom w-4/5 mb-10 px-6 py-16 lg:-mt-6 text-white text-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-700">
          <h5 className="font-bold text-base ">Professional</h5>
          <h2 className="font-bold pb-4 mt-2 border-b border-gray-100 flex justify-center">
            <span className="text-3xl mt-6 mr-1">$</span>
            <span className="text-6xl">{billingInterval === 'month' ? '24.99' : '249.99'}</span>
          </h2>
          <ul className=" text-sm font-bold">
            <li className="pt-4 pb-4 border-b border-gray-200">1 TB Storage</li>
            <li className="pt-4 pb-4 border-b border-gray-200">5 Users allowed</li>
            <li className="pt-4 pb-4 border-b border-gray-200">All features</li>
            <li className="pt-4 pb-4 border-b border-gray-200">Priority support</li>
          </ul>
          <Button
            type="button"
            disabled={false}
            loading={priceIdLoading === priceIds.professionalMonthly || priceIdLoading === priceIds.professionalYearly}
            onClick={() => handleCheckout(billingInterval === 'month' ? priceIds.professionalMonthly : priceIds.professionalYearly)}
            className="uppercase text-center text-sm mt-10 px-12 py-2 rounded-md font-bold bg-white text-black">
            {
              subscription ?
                'Manage account'
                :
                'Subscribe'
            }
          </Button>
          {
            (priceError.priceId === priceIds.professionalMonthly || priceError.priceId === priceIds.professionalYearly) && priceError.message &&
            <div className='mt-4 text-white text-center border border-gray-400 border-solid p-3 rounded-lg'>
              {priceError.message}
            </div>
          }
        </div>
        <div className="bg-white text-black w-4/5 lg:w-custom mb-10 lg:px-4 px-6 py-10 text-center rounded-lg">
          <h5 className="font-bold text-base">Master</h5>
          <h2 className="flex justify-center pb-4 font-bold border-b border-gray-200">
            <span className="text-3xl mt-6 mr-1">$</span>
            <span className="text-6xl">{billingInterval === 'month' ? '39.99' : '399.99'}</span>
          </h2>
          <ul className="text-sm font-bold">
            <li className="pt-4 pb-4 border-b border-gray-200">2 TB Storage</li>
            <li className="pt-4 pb-4 border-b border-gray-200">10 Users allowed</li>
            <li className="pt-4 pb-4 border-b border-gray-200">All features</li>
            <li className="pt-4 pb-4 border-b border-gray-200">Priority support</li>
          </ul>
          <Button
            type="button"
            disabled={false}
            loading={priceIdLoading === priceIds.masterMonthly || priceIdLoading === priceIds.masterYearly}
            onClick={() => handleCheckout(billingInterval === 'month' ? priceIds.masterMonthly : priceIds.masterYearly)}
            className="uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700">
            {
              subscription ?
                'Manage account'
                :
                'Subscribe'
            }
          </Button>
          {
            (priceError.priceId === priceIds.masterMonthly || priceError.priceId === priceIds.masterYearly) && priceError.message &&
            <div className='mt-4 text-gray-900 text-center border border-gray-400 border-solid p-3 rounded-lg'>
              {priceError.message}
            </div>
          }
        </div>
      </div>
    </>
  );
}
