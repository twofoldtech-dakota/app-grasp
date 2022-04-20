import { supabase } from '@/utils/supabase-client';

export async function deleteExchange({ id, active, key, secret }) {
	//await supabase.from('exchanges').delete().match({ id: id });
	const { data, error } = await supabase
		.from('exchanges')
		.update({
			active: active,
			key: key,
			secret: secret,
		})
		.eq('id', id);

	if (error) return '';

	return data;
}
