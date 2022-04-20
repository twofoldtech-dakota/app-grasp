import { Exchange } from '@/types/exchange';
import { supabase } from '@/utils/supabase-client';

export async function getExchanges() {
	let data: Exchange[] = [];
	const { data: exchanges, error: exchangeError } = await supabase
		.from('exchanges')
		.select('*');

	if (exchangeError) {
		console.error(exchangeError);
		return data;
	}

	data = exchanges;

	return data;
}
