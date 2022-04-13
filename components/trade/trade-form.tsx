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
}) {
	return (
		<form onSubmit={onSubmit}>
			<label>
				Asset Pair
				<input
					name="pair"
					value={pair}
					placeholder="btc/usd"
					onChange={onPairChange}
				/>
			</label>

			<label>
				Description
				<input
					name="description"
					value={description}
					placeholder="Description"
					onChange={onDescriptionChange}
				/>
			</label>

			<label>
				Entry Date
				<input
					name="entry_date"
					value={entry_date}
					placeholder="Entry Date"
					onChange={onEntryDateChange}
				/>
			</label>

			<label>
				Exit Date
				<input
					name="exit_date"
					value={exit_date}
					placeholder="Exit Date"
					onChange={onExitDateChange}
				/>
			</label>

			<label>
				Entry Price
				<input
					name="entry_price"
					value={entry_price}
					placeholder="Entry Price"
					onChange={onEntryPriceChange}
				/>
			</label>

			<label>
				Exit Price
				<input
					name="exit_price"
					value={exit_price}
					placeholder="Exit Price"
					onChange={onExitPriceChange}
				/>
			</label>

			<label>
				Position Size
				<input
					name="position_size"
					value={position_size}
					placeholder="Position Size"
					onChange={onPositionSizeChange}
				/>
			</label>

			<label>
				Risk Percentage
				<input
					name="risk_percentage"
					value={risk_percentage}
					placeholder="Risk Percentage"
					onChange={onRiskPercentageChange}
				/>
			</label>

			<label>
				Type
				<input
					name="type"
					value={type}
					placeholder="Type"
					onChange={onTypeChange}
				/>
			</label>

			<label>
				Setup
				<input
					name="setup"
					value={setup}
					placeholder="Setup"
					onChange={onSetupChange}
				/>
			</label>

			<label>
				Trigger
				<input
					name="trigger"
					value={trigger}
					placeholder="Trigger"
					onChange={onTriggerChange}
				/>
			</label>

			<button type="submit">Save</button>
		</form>
	);
}
