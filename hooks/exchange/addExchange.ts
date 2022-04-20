import { supabase } from '@/utils/supabase-client';
import { v4 as uuidv4 } from 'uuid';

export async function addExchange({ userId, name, key, secret }) {
	const { data, error } = await supabase.from('exchanges').insert([
		{
			id: uuidv4(),
			user_id: userId,
			name: name,
			key: key,
			secret: secret,
		},
	]);
	if (error) return '';

	return data;
}
