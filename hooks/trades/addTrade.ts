import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';

export async function addTrade({ pair, userId, entryDate, entryPrice }) {
	const { data, error } = await supabase.from('trades').insert([
		{
			id: uuidv4(),
			pair: pair,
			user_id: userId,
			entry_date: entryDate,
			entry_price: entryPrice,
		},
	]);
	if (error) return '';

	return data;
}
