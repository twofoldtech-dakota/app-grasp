import { supabase } from '@/utils/supabase-client';

export async function updateExchange({ id, userId, name, key, secret }) {
	const { data, error } = await supabase
		.from('exchanges')
		.update({
			user_id: userId,
			name: name,
			key: key,
			secret: secret,
		})
		.eq('id', id);

	if (error) return '';

	return data;
}
