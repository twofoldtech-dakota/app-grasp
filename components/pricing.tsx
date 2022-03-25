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
};

export default function Pricing() {
	const router = useRouter();
	const [billingInterval, setBillingInterval] = useState<'month' | 'year'>(
		'year'
	);
	const [priceIdLoading, setPriceIdLoading] = useState('');
	const [priceError, setPriceError] = useState({ priceId: '', message: '' });
	const session = useSession();
	const subscription = useSubscription();

	const handleCheckout = async (priceId: string) => {
		setPriceIdLoading(priceId);

		if (!session) {
			return router.push('/signin?returnUrl=/pricing');
		}

		if (subscription) {
			return router.push('/account');
		}

		try {
			const { data } = await postData<{ sessionId: string }>(
				'/api/get-checkout-session',
				{ priceId }
			);
			const stripe = await getStripe();
			stripe.redirectToCheckout({ sessionId: data.sessionId });
		} catch (error) {
			setPriceError({
				priceId: priceId,
				message: `
        This is a demo application. The real Stripe price ID's are not configured.
        This action would redirect a user to Stripe where they can start/manage their subscription.`,
			});
		} finally {
			setPriceIdLoading('');
		}
	};
	return (
		<>
			<div className="flex flex-col items-center mb-6">
				<h2 className="mb-6 text-4xl font-bold text-center">Pricing</h2>
				<div className="relative flex self-center p-1 mt-6 bg-white border border-white rounded-lg">
					<button
						onClick={() => setBillingInterval('month')}
						type="button"
						className={`border border-gray-300 border-solid rounded-md m-1 px-8 py-2 text-sm whitespace-nowrap focus:outline-none focus:z-5
            ${
							billingInterval === 'month'
								? 'ml-1 relative w-1/2 text-white font-bold bg-primary-500'
								: 'relative w-1/2 bg-white text-black shadow-sm'
						}
                `}
					>
						Monthly billing
					</button>
					<button
						onClick={() => setBillingInterval('year')}
						type="button"
						className={`border border-gray-300 border-solid rounded-md m-1 px-8 py-2 text-sm whitespace-nowrap focus:outline-none focus:z-5
            ${
							billingInterval === 'year'
								? 'ml-1 relative w-1/2 text-white font-bold bg-primary-500'
								: 'relative w-1/2 bg-white text-black shadow-sm'
						}
               `}
					>
						Yearly billing
					</button>
				</div>
			</div>
			<div className="flex flex-col items-center w-full py-8 lg:flex-row lg:justify-center lg:px-10">
				<div className="w-4/5 px-6 py-10 mb-10 text-center text-black bg-white rounded-lg lg:w-custom lg:px-4">
					<h5 className="text-base font-bold">Basic</h5>
					<h2 className="flex justify-center pb-4 font-bold border-b border-gray-300">
						<span className="mt-6 mr-1 text-3xl">$</span>
						<span className="text-6xl">
							{billingInterval === 'month'
								? priceIds.basicMonthly
								: priceIds.basicYearly}
						</span>
					</h2>
					<ul className="text-sm font-bold">
						<li className="pt-4 pb-4 border-b border-gray-300">
							Access to discord community
						</li>
						<li className="pt-3 pb-4 border-b border-gray-300">
							Manual trading journal
						</li>
						<li className="pt-4 pb-4 border-b border-gray-300">
							Weekly market analysis
						</li>
					</ul>
					<Button
						type="button"
						disabled={false}
						loading={
							priceIdLoading === priceIds.basicMonthly ||
							priceIdLoading === priceIds.basicYearly
						}
						onClick={() =>
							handleCheckout(
								billingInterval === 'month'
									? priceIds.basicMonthly
									: priceIds.basicYearly
							)
						}
						className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700"
					>
						{subscription ? 'Manage account' : 'Subscribe'}
					</Button>
					{(priceError.priceId === priceIds.basicMonthly ||
						priceError.priceId === priceIds.basicYearly) &&
						priceError.message && (
							<div className="p-3 mt-4 text-center text-gray-900 border border-gray-400 border-solid rounded-lg">
								{priceError.message}
							</div>
						)}
				</div>
				<div className="w-4/5 px-6 py-16 mb-10 text-center text-white rounded-lg lg:w-custom lg:-mt-6 bg-gradient-to-r from-primary-500 to-primary-700">
					<h5 className="text-base font-bold ">Professional</h5>
					<h2 className="flex justify-center pb-4 mt-2 font-bold border-b border-gray-100">
						<span className="mt-6 mr-1 text-3xl">$</span>
						<span className="text-6xl">
							{billingInterval === 'month'
								? priceIds.professionalMonthly
								: priceIds.professionalYearly}
						</span>
					</h2>
					<ul className="text-sm font-bold ">
						<li className="pt-4 pb-4 border-b border-gray-200">
							Everything in Basic
						</li>
						<li className="pt-4 pb-4 border-b border-gray-200">
							Automated trading journal
						</li>
						<li className="pt-4 pb-4 border-b border-gray-200">
							Industry leading trade analytics
						</li>
						<li className="pt-4 pb-4 border-b border-gray-200">
							Indicator suite (coming soon)
						</li>
					</ul>
					<Button
						type="button"
						disabled={false}
						loading={
							priceIdLoading === priceIds.professionalMonthly ||
							priceIdLoading === priceIds.professionalYearly
						}
						onClick={() =>
							handleCheckout(
								billingInterval === 'month'
									? priceIds.professionalMonthly
									: priceIds.professionalYearly
							)
						}
						className="px-12 py-2 mt-10 text-sm font-bold text-center text-black uppercase bg-white rounded-md"
					>
						{subscription ? 'Manage account' : 'Subscribe'}
					</Button>
					{(priceError.priceId === priceIds.professionalMonthly ||
						priceError.priceId === priceIds.professionalYearly) &&
						priceError.message && (
							<div className="p-3 mt-4 text-center text-white border border-gray-400 border-solid rounded-lg">
								{priceError.message}
							</div>
						)}
				</div>
			</div>
		</>
	);
}
