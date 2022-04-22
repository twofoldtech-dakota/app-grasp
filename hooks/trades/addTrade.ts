import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';

export async function addTrade({
	userId,
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
	active,
}) {
	const { data, error } = await supabase.from('trades').insert([
		{
			id: uuidv4(),
			user_id: userId,
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
			active: active,
		},
	]);
	if (error) return '';

	return data;
}
