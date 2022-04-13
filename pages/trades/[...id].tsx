import { useRouter } from 'next/router';
import { useState } from 'react';
import TradeForm from '@/components/trade/trade-form';
import { Trade } from '@/types/trade';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import ProtectedRoute from '@/utils/protected-route';
import { supabaseAdmin } from '@/utils/supabase-admin-client';
import { useMutation, useQuery } from 'react-query';
import { updateTrade } from 'hooks/trades/updateTrade';
import { getTrades } from 'hooks/trades/getTrades';

interface EditTradeProps {
	trade: Trade;
}

export default function EditTrade({ trade }: EditTradeProps) {
	const updateTradeMutation = useMutation(updateTrade);
	const getTradesQuery = useQuery('getTrades', getTrades);

	const [pair, setPair] = useState(trade.pair);
	const [description, setDescription] = useState(trade.description);
	const [entryDate, setEntryDate] = useState(trade.entry_date);
	const [exitDate, setExitDate] = useState(trade.exit_date);
	const [entryPrice, setEntryPrice] = useState(trade.entry_price);
	const [exitPrice, setExitPrice] = useState(trade.exit_price);
	const [positionSize, setPositionSize] = useState(trade.position_size);
	const [riskPercentage, setRiskPercentage] = useState(trade.risk_percentage);
	const [type, setType] = useState(trade.type);
	const [setup, setSetup] = useState(trade.setup);
	const [trigger, setTrigger] = useState(trade.trigger);
	const router = useRouter();

	return (
		<>
			<section className="py-10">
				<div className="flex flex-col items-center mb-6">
					<h2 className="mb-6 text-4xl font-bold text-center">Edit Trade</h2>
					<TradeForm
						pair={pair}
						onPairChange={(evt) => setPair(evt.target.value)}
						description={description}
						onDescriptionChange={(evt) => setDescription(evt.target.value)}
						entry_date={entryDate}
						onEntryDateChange={(evt) => setEntryDate(evt.target.value)}
						exit_date={exitDate}
						onExitDateChange={(evt) => setExitDate(evt.target.value)}
						entry_price={entryPrice}
						onEntryPriceChange={(evt) => setEntryPrice(evt.target.value)}
						exit_price={exitPrice}
						onExitPriceChange={(evt) => setExitPrice(evt.target.value)}
						position_size={positionSize}
						onPositionSizeChange={(evt) => setPositionSize(evt.target.value)}
						risk_percentage={riskPercentage}
						onRiskPercentageChange={(evt) =>
							setRiskPercentage(evt.target.value)
						}
						type={type}
						onTypeChange={(evt) => setType(evt.target.value)}
						setup={setup}
						onSetupChange={(evt) => setSetup(evt.target.value)}
						trigger={trigger}
						onTriggerChange={(evt) => setTrigger(evt.target.value)}
						onSubmit={async (evt) => {
							evt.preventDefault();
							updateTradeMutation.mutate(
								{
									id: trade.id,
									pair: pair,
									entryDate: entryDate,
									entryPrice: entryPrice,
								},
								{
									onSuccess() {
										getTradesQuery.refetch();
										router.push('/trades');
									},
									onError(err) {
										alert(err);
									},
								}
							);
						}}
					/>
				</div>
			</section>
		</>
	);
}
export const getServerSideProps: GetServerSideProps = (
	context: GetServerSidePropsContext
) =>
	ProtectedRoute(context, null, async () => {
		const { data: trade, error: tradeError } = await supabaseAdmin
			.from('trades')
			.select('*')
			.eq('id', context.query.id)
			.single();
		if (tradeError) {
			return {};
		}
		return {
			trade,
		};
	});
