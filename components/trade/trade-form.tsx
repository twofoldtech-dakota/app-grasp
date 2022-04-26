import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link';
import { getExchanges } from 'hooks/exchange/getExchanges';
import { useQuery } from 'react-query';

export default function TradeForm({
	pair,
	description,
	//image,
	entry_date,
	exit_date,
	entry_price,
	exit_price,
	position_size,
	risk_percentage,
	//realized_pnl,
	//realized_pnl_percentage,
	//taxes_owed,
	type,
	setup,
	trigger,
	onPairChange,
	onDescriptionChange,
	//onImageChange,
	onEntryDateChange,
	onExitDateChange,
	onEntryPriceChange,
	onExitPriceChange,
	onPositionSizeChange,
	onRiskPercentageChange,
	onTypeChange,
	onSetupChange,
	onTriggerChange,
	onSubmit,
	onExchangeChange,
	exchange,
}) {
	const getExchangesQuery = useQuery('getExchanges', getExchanges);

	const validationSchema = Yup.object().shape({
		pair: Yup.string().required('Traiding pair is required'),
		position_size: Yup.string().required('Position size is required'),
		risk_percentage: Yup.string()
			.typeError('Exit price must be a positive number')
			.notRequired()
			.nullable(true),
		entry_price: Yup.number()
			.typeError('Entry price must be a positive number')
			.min(0)
			.required('Entry Price is required'),
		exit_price: Yup.string()
			.typeError('Exit price must be a positive number')
			.notRequired()
			.nullable(true),
		entry_date: Yup.string().required('Entry Date is required'),
		exit_date: Yup.string(),
		description: Yup.string(),
		exchange: Yup.string(),
		setup: Yup.string(),
		trigger: Yup.string(),
		type: Yup.boolean(),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			onReset={reset}
			className="w-full max-w-2xl"
		>
			<div className="flex flex-wrap mb-2 -mx-3">
				<div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Trading Pair
					</label>
					<input
						{...register('pair')}
						defaultValue={pair}
						placeholder="btc/usd"
						onChange={onPairChange}
						className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
							errors.pair ? 'border-red-500' : ''
						}`}
					/>
					<p className="text-xs italic text-red-500">{errors.pair?.message}</p>
				</div>
				<div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Position Size
					</label>
					<input
						type="number"
						step="any"
						placeholder="1,000"
						{...register('position_size')}
						className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
							errors.position_size ? 'border-red-500' : ''
						}`}
						defaultValue={position_size}
						onChange={onPositionSizeChange}
					/>
					<p className="text-xs italic text-red-500">
						{errors.position_size?.message}
					</p>
				</div>
				<div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Risk Percentage
					</label>
					<input
						type="number"
						step="any"
						placeholder="1"
						{...register('risk_percentage')}
						className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
							errors.risk_percentage ? 'border-red-500' : ''
						}`}
						defaultValue={risk_percentage}
						onChange={onRiskPercentageChange}
					/>
					<p className="text-xs italic text-red-500">
						{errors.risk_percentage?.message}
					</p>
				</div>
			</div>
			<div className="flex flex-wrap mb-6 -mx-3">
				<div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Entry Price
					</label>
					<input
						{...register('entry_price')}
						className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
							errors.entry_price ? 'border-red-500' : ''
						}`}
						defaultValue={entry_price}
						type="number"
						step="any"
						placeholder="1.89"
						onChange={onEntryPriceChange}
					/>
					<p className="text-xs italic text-red-500">
						{errors.entry_price?.message}
					</p>
				</div>
				<div className="w-full px-3 md:w-1/2">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Exit Price
					</label>
					<input
						{...register('exit_price')}
						className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
							errors.exit_price ? 'border-red-500' : ''
						}`}
						name="exit_price"
						value={exit_price}
						type="number"
						step="any"
						placeholder="2.51"
						onChange={onExitPriceChange}
					/>
					<p className="text-xs italic text-red-500">
						{errors.exit_price?.message}
					</p>
				</div>
			</div>
			<div className="flex flex-wrap mb-6 -mx-3">
				<div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Entry Date
					</label>
					<input
						{...register('entry_date')}
						className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
							errors.entry_date ? 'border-red-500' : ''
						}`}
						defaultValue={entry_date}
						type="datetime-local"
						onChange={onEntryDateChange}
					/>
					<p className="text-xs italic text-red-500">
						{errors.entry_date?.message}
					</p>
				</div>
				<div className="w-full px-3 md:w-1/2">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Exit Date
					</label>
					<input
						{...register('exit_date')}
						className="block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800"
						name="exit_date"
						value={exit_date}
						type="datetime-local"
						onChange={onExitDateChange}
					/>
				</div>
			</div>
			<div className="flex flex-wrap mb-6 -mx-3">
				<div className="w-full px-3">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Description
					</label>
					<textarea
						{...register('description')}
						className="block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800"
						name="description"
						rows={6}
						value={description}
						onChange={onDescriptionChange}
					/>
					<p className="text-xs italic text-gray-600">
						Describe what you are thinking, how you are feeling, market
						sentiment and other details
					</p>
				</div>
			</div>
			<div className="flex flex-wrap mb-2 -mx-3">
				<div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Exchange
					</label>
					<div className="relative">
						{getExchangesQuery.isLoading && <div>Loading Exchanges...</div>}
						{getExchangesQuery.error && (
							<div>There was an error retrieving your exchanges</div>
						)}
						{getExchangesQuery.data ? (
							<select
								{...register('exchange')}
								className="block w-full px-4 py-3 mb-3 leading-tight border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800"
								placeholder="Choose Exchange"
								name="exchange"
								onChange={onExchangeChange}
								defaultValue={exchange}
							>
								<option value="-1">Select Exchange</option>
								{getExchangesQuery.data.map((exchangeItem) => {
									if (exchange == exchangeItem.name) {
										console.log('selected', exchange);
										return (
											<option key={exchangeItem.id} value={exchangeItem.name}>
												{exchangeItem.name}
											</option>
										);
									}
									return (
										<option key={exchangeItem.id} value={exchangeItem.name}>
											{exchangeItem.name}
										</option>
									);
								})}
							</select>
						) : (
							<option>No exchanges found</option>
						)}
					</div>{' '}
				</div>
				<div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Setup
					</label>
					<div className="relative">
						<input
							{...register('setup')}
							className="block w-full px-4 py-3 mb-3 leading-tight border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800"
							type="text"
							placeholder="Support Retest"
							name="setup"
							value={setup}
							onChange={onSetupChange}
						/>
					</div>
				</div>
				<div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
					<label className="block mb-2 text-xs font-bold tracking-wide uppercase">
						Trigger
					</label>
					<input
						{...register('trigger')}
						className="block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800"
						type="text"
						placeholder="1hr close"
						name="trigger"
						value={trigger}
						onChange={onTriggerChange}
					/>
				</div>
			</div>
			<div className="flex flex-wrap mb-2 -mx-3">
				<div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
					<label
						className="block mb-2 text-xs font-bold tracking-wide uppercase"
						htmlFor="type"
					>
						Is this a buy?
					</label>
					<input
						{...register('type')}
						className="block px-4 py-3 mb-3 leading-tight border rounded appearance-none focus:outline-none dark:bg-gray-900"
						name="type"
						id="type"
						value={type}
						type="checkbox"
						onChange={onTypeChange}
					/>
				</div>
			</div>
			<div className="flex flex-wrap mb-2 -mx-3">
				<div className="flex w-full px-3 place-content-end">
					<Link href="/trades">
						<a className="px-12 py-2 mr-3 text-sm font-bold text-center uppercase border rounded-md dark:border-white">
							Cancel
						</a>
					</Link>
					<button
						type="submit"
						className="px-12 py-2 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
