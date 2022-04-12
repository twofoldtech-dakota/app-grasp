import { PageSEO } from '@/components/seo';
import TradeList from '@/components/trade/trade-list';
import { Trade } from '@/types/trade';
import ProtectedRoute from '@/utils/protected-route';
import { supabaseAdmin } from '@/utils/supabase-admin-client';
//import { supabase } from '@/utils/supabase-client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface TradeProps {
	trades: Trade[];
}

export default function Trades({ trades }: TradeProps) {
	return (
		<>
			<PageSEO
				title="Trades - Grasp"
				description="Grasp is the best online crypto journal your trades and find your edge"
			/>

			<section className="py-10">
				<div className="flex flex-col items-center mb-6">
					<h2 className="mb-6 text-4xl font-bold text-center">Trades</h2>
					{trades ? <TradeList trades={trades} /> : <div>No trades found</div>}
				</div>
			</section>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = (
	context: GetServerSidePropsContext
) =>
	ProtectedRoute(context, null, async () => {
		//const { user } = await supabase.auth.api.getUserByCookie(context.req);
		const { data: trades, error: tradeError } = await supabaseAdmin
			.from('trades')
			.select('*');

		if (tradeError) {
			return {};
		}

		return {
			trades,
		};
	});
