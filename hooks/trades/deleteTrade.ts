import { supabase } from '@/utils/supabase-client';

export async function deleteTrade({ id }) {
	await supabase.from('trades').delete().match({ id: id });
}
