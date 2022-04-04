import { PageSEO } from '@/components/seo';
import ProtectedRoute from '@/utils/protected-route';
import { supabaseAdmin } from '@/utils/supabase-admin-client';
import { supabase } from '@/utils/supabase-client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Trades() {
	return (
		<>
			<PageSEO
				title="Trades - Grasp"
				description="Grasp is the best online crypto journal your trades and find your edge"
			/>

			<section className="py-10">
				<div className="flex flex-col items-center mb-6">
					<h2 className="mb-6 text-4xl font-bold text-center">Trades</h2>
				</div>
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = (
	context: GetServerSidePropsContext
) =>
	ProtectedRoute(context, null, async () => {
		const { user } = await supabase.auth.api.getUserByCookie(context.req);
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
