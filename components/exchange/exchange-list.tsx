import { useQuery } from 'react-query';
import { getExchanges } from 'hooks/exchange/getExchanges';
import ExchangeListItem from './exchange-list-item';
import { useState } from 'react';

interface ExchangeListProps {
	userId: string;
}
export default function ExchangeList({ userId }: ExchangeListProps) {
	const getExchangesQuery = useQuery('getExchanges', getExchanges);
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="flex flex-col pb-6 mt-8">
			<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
				<div className="inline-block min-w-full align-middle">
					<h3 className="text-xl">Exchanges</h3>
					{getExchangesQuery.isLoading && <div>Loading...</div>}
					{getExchangesQuery.error && (
						<div>There was an error retrieving your exchanges</div>
					)}
					{getExchangesQuery.data ? (
						<div className="">
							{getExchangesQuery.data.map((exchange) => {
								return (
									<ExchangeListItem
										id={exchange.id}
										active={exchange.active}
										name={exchange.name}
										api_key={exchange.api_key}
										api_secret={exchange.api_secret}
										key={exchange.id}
										isNew={false}
										userId={userId}
									/>
								);
							})}
						</div>
					) : (
						<div>No Results</div>
					)}
					<div className="pt-5 mt-10 border-t">
						{showForm ? (
							<div>
								<ExchangeListItem
									id={''}
									active={''}
									name={''}
									api_key={''}
									api_secret={''}
									isNew={true}
									userId={userId}
								/>
								<button
									type="button"
									onClick={() => setShowForm(!showForm)}
									className="px-4 py-2 mr-3 text-sm font-bold text-center uppercase bg-red-600 rounded-md"
								>
									Cancel
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={() => setShowForm(!showForm)}
								className="px-4 py-2 mr-3 text-sm font-bold text-center uppercase bg-green-600 rounded-md"
							>
								Add
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
