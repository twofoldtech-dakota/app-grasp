import { useMutation, useQuery } from 'react-query';
import { getExchanges } from 'hooks/exchange/getExchanges';
import { deleteExchange } from 'hooks/exchange/deleteExchange';
import { ExchangeForm } from './exchange-list-item';

export default function ExchangeList() {
	const getExchangesQuery = useQuery('getExchanges', getExchanges);
	//const deleteExchangeMutation = useMutation(deleteExchange);

	return (
		<div className="flex flex-col mt-8">
			<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
				<div className="inline-block min-w-full align-middle border-b">
					<h3>Exchanges</h3>
					{getExchangesQuery.isLoading && <div>Loading...</div>}
					{getExchangesQuery.error && (
						<div>There was an error retrieving your exchanges</div>
					)}
					{getExchangesQuery.data ? (
						<div className="p-2 border">
							{getExchangesQuery.data.map((exchange) => {
								return (
									<ExchangeForm
										active={exchange.active}
										name={exchange.name}
										key={exchange.key}
										secret={exchange.secret}
									/>
								);
							})}
						</div>
					) : (
						<div>No Results</div>
					)}
				</div>
			</div>
		</div>
	);
}
