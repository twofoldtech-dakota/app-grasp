import { Trade } from '@/types/trade';
import { supabase } from '@/utils/supabase-client';

export async function getTrades() {
	let data: Trade[] = [];
	const { data: trades, error: tradeError } = await supabase
		.from('trades')
		.select('*');

	if (tradeError) {
		console.error('Error fetching trades');
	}

	data = trades;

	return data;
}
