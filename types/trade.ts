export type Trade = {
	id: string;
	active: boolean;
	pair: string;
	description: string;
	image: string;
	entry_date: string;
	exit_date: string;
	entry_price: number;
	exit_price: number;
	position_size: number;
	risk_percentage: number;
	realized_pnl: number;
	realized_pnl_percentage: number;
	taxes_owed: number;
	type: string;
	setup: string;
	trigger: string;
};
