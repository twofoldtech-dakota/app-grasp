import { PageSEO } from '@/components/seo';
import TradeList from '@/components/trade/trade-list';
import Link from 'next/link';
// import { Trade } from '@/types/trade';
//import ProtectedRoute from '@/utils/protected-route';
//import { supabaseAdmin } from '@/utils/supabase-admin-client';
//import { supabase } from '@/utils/supabase-client';
//import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// interface TradeProps {
// 	trades: Trade[];
// }

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
					{/* {trades ? <TradeList trades={trades} /> : <div>No trades found</div>} */}
					<Link href="/trades/new">
						<a className="uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700">
							Manually Add Trade
						</a>
					</Link>
					{/* <Link href="#">
						<a className="uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700">
							Sync trades from exchange
						</a>
					</Link> */}
					<TradeList />
				</div>
			</section>
		</>
	);
}

// export const getServerSideProps: GetServerSideProps = (
// 	context: GetServerSidePropsContext
// ) =>
// 	ProtectedRoute(context, null, async () => {
// 		const { user } = await supabase.auth.api.getUserByCookie(context.req);
// 		const { data: trades, error: tradeError } = await supabaseAdmin
// 			.from('trades')
// 			.select('*');
// 		if (tradeError) {
// 			return {};
// 		}
// 		return {
// 			trades,
// 		};
// 	});
