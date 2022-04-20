import { PageSEO } from '@/components/seo';
import TradeList from '@/components/trade/trade-list';
import Link from 'next/link';

export default function Trades() {
	return (
		<>
			<PageSEO
				title="Trades - Grasp"
				description="Grasp is the best online crypto journal your trades and find your edge"
			/>

			<section className="p-10">
				<div className="flex flex-col items-center mb-6">
					<h2 className="mb-6 text-4xl font-bold text-center">Trades</h2>
					<Link href="/trades/new">
						<a className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700">
							Manually Add Trade
						</a>
					</Link>
					<button className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700">
						Sync trades from exchanges
					</button>
					<Link href="/profile">
						<a className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700">
							Connect Exchanges
						</a>
					</Link>
					<TradeList />
				</div>
			</section>
		</>
	);
}
