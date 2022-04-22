import { supabase } from '@/utils/supabase-client';

export async function updateExchange({ id, name, key, secret, active }) {
	const { data, error } = await supabase
		.from('exchanges')
		.update({
			name: name,
			api_key: key,
			api_secret: secret,
			active: active,
		})
		.eq('id', id);

	if (error) return '';

	return data;
}
