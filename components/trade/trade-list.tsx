import { Trade } from '@/types/trade';
import { deleteTrade } from '@/utils/database';
import { currencyFormatter } from '@/utils/helpers';
import Link from 'next/link';

interface TradeListProps {
	trades: Trade[];
}
export default function TradeList({ trades }: TradeListProps) {
	return (
		<div className="w-4/5">
			<div className="flex flex-col mt-8">
				<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="inline-block min-w-full align-middle border-b shadow">
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase border-2">
										Asset
									</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase border-2">
										Position Size
									</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase border-2">
										Entry
									</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase border-2">
										PNL
									</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase border-2">
										Status
									</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase border-2">
										Edit
									</th>
									<th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase border-2">
										Delete
									</th>
								</tr>
							</thead>

							<tbody className="">
								{trades.map((trade) => {
									let status = 'Open';
									if (trade.active != null && trade.active == false) {
										status = 'Closed';
									}
									return (
										<tr key={trade.id}>
											<td className="px-6 py-4 whitespace-no-wrap border-b">
												<div className="flex items-center">
													<div className="flex-shrink-0 w-10 h-10">
														<img
															className="w-10 h-10 rounded-full"
															src="https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg"
															alt="Avatar Tailwind CSS Component"
														/>
													</div>

													<div className="ml-4">
														<div className="text-sm font-medium leading-5">
															{trade.pair}
														</div>
													</div>
												</div>
											</td>

											<td className="px-6 py-4 whitespace-no-wrap border-b">
												<div className="text-sm leading-5">
													{currencyFormatter(trade.position_size)}
												</div>
											</td>

											<td className="px-6 py-4 whitespace-no-wrap border-b">
												<div className="text-sm leading-5">
													{currencyFormatter(trade.entry_price)}
												</div>
											</td>

											<td className="px-6 py-4 whitespace-no-wrap border-b">
												<div className="text-sm leading-5">
													{currencyFormatter(trade.realized_pnl)} {'('}
													{trade.realized_pnl_percentage}
													{'%)'}
												</div>
											</td>

											<td className="px-6 py-4 whitespace-no-wrap border-b">
												<span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
													{status}
												</span>
											</td>

											<td className="px-6 py-4 text-sm leading-5 whitespace-no-wrap border-b">
												<Link href={`/trade/${trade.id}`}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-6 h-6 text-blue-400 hover:cursor-pointer hover:w-7 hover:h-7"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
														/>
													</svg>
												</Link>
											</td>
											<td className="px-6 py-4 text-sm leading-5 whitespace-no-wrap border-b">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="w-6 h-6 text-red-400 hover:cursor-pointer hover:w-7 hover:h-7"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													onClick={() => deleteTrade(trade.id)}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
