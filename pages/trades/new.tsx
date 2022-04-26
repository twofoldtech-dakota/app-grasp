import { useRouter } from 'next/router';
import { useState } from 'react';
import TradeForm from '@/components/trade/trade-form';
import { useMutation, useQuery } from 'react-query';
import { addTrade } from 'hooks/trades/addTrade';
import { useUserDetails } from '@/utils/user-context';
import { getTrades } from 'hooks/trades/getTrades';

export default function NewTrade() {
	const userDetails = useUserDetails();
	const addTradeMutation = useMutation(addTrade);
	const getTradesQuery = useQuery('getTrades', getTrades);

	const [pair, setPair] = useState('');
	const [description, setDescription] = useState('');
	const [entryDate, setEntryDate] = useState('');
	const [exitDate, setExitDate] = useState('');
	const [entryPrice, setEntryPrice] = useState('');
	const [exitPrice, setExitPrice] = useState('');
	const [positionSize, setPositionSize] = useState('');
	const [riskPercentage, setRiskPercentage] = useState('');
	const [type, setType] = useState('');
	const [setup, setSetup] = useState('');
	const [trigger, setTrigger] = useState('');
	const [exchange, setExchange] = useState('');
	const router = useRouter();

	return (
		<>
			<section className="p-10">
				<div className="flex flex-col items-center mb-6">
					<h2 className="mb-6 text-4xl font-bold text-center">
						Add a new trade
					</h2>
					<hr />
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
						exchange={exchange}
						onExchangeChange={(evt) => setExchange(evt.target.value)}
						onSubmit={async () => {
							let nullableExitPrice = null;
							if (exitPrice != '') {
								nullableExitPrice = exitPrice;
							}
							let nullableRiskPercentage = null;
							if (riskPercentage != '') {
								nullableRiskPercentage = riskPercentage;
							}
							addTradeMutation.mutate(
								{
									userId: userDetails.id,
									pair: pair,
									entryDate: entryDate,
									entryPrice: entryPrice,
									exitDate: exitDate,
									exitPrice: nullableExitPrice,
									positionSize: positionSize,
									risk: nullableRiskPercentage,
									description: description,
									type: type,
									trigger: trigger,
									setup: setup,
									active: true,
									exchange: exchange,
								},
								{
									onSuccess: () => {
										getTradesQuery.refetch();
										router.push('/trades');
									},
									onError: (err) => {
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
