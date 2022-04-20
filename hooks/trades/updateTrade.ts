import { supabase } from '@/utils/supabase-client';

export async function updateTrade({
	id,
	pair,
	entryDate,
	exitDate,
	entryPrice,
	exitPrice,
	positionSize,
	risk,
	description,
	setup,
	trigger,
	type,
}) {
	const { data, error } = await supabase
		.from('trades')
		.update({
			pair: pair,
			entry_date: entryDate,
			exit_date: exitDate,
			entry_price: entryPrice,
			exit_price: exitPrice,
			position_size: positionSize,
			risk_percentage: risk,
			description: description,
			setup: setup,
			trigger: trigger,
			type: type,
		})
		.eq('id', id);

	if (error) return '';

	return data;
}
