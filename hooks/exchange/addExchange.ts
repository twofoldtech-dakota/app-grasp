import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';

export async function addExchange({ userId, name, key, secret }) {
	const { data, error } = await supabase.from('exchanges').insert([
		{
			id: uuidv4(),
			user_id: userId,
			name: name,
			api_key: key,
			api_secret: secret,
			active: true,
		},
	]);
	if (error) return '';

	return data;
}
