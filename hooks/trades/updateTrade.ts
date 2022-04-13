import { supabase } from '@/utils/supabase-client';

export async function updateTrade({ id, pair, entryDate, entryPrice }) {
	const { data, error } = await supabase
		.from('trades')
		.update({
			pair: pair,
			entry_date: entryDate,
			entry_price: entryPrice,
		})
		.eq('id', id);

	if (error) return '';

	return data;
}
