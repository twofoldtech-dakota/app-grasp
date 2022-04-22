import { Exchange } from '@/types/exchange';
import { addExchange } from 'hooks/exchange/addExchange';
import { getExchanges } from 'hooks/exchange/getExchanges';
import { updateExchange } from 'hooks/exchange/updateExchange';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

export default function ExchangeListItem({
	id,
	name,
	api_key,
	api_secret,
	active,
	isNew,
	userId,
}) {
	const [showForm, setShowForm] = useState(isNew);
	const getExchangesQuery = useQuery('getExchanges', getExchanges);
	const updateExchangeMutation = useMutation(updateExchange);
	const addExchangeMutation = useMutation(addExchange);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Exchange>({
		defaultValues: {
			name,
			api_key,
			api_secret,
			active,
		},
	});

	useEffect(() => {
		reset({
			name,
			api_key,
			api_secret,
			active,
		});
	}, [reset, name, api_key, api_secret, active]);

	const onSubmit = (data: Exchange) => {
		if (isNew == false) {
			updateExchangeMutation.mutate(
				{
					id: id,
					key: data.api_key,
					name: data.name,
					secret: data.api_secret,
					active: data.active,
				},
				{
					onSuccess() {
						getExchangesQuery.refetch();
						setShowForm(!showForm);
					},
					onError(err) {
						alert(err);
					},
				}
			);
		} else {
			addExchangeMutation.mutate(
				{
					userId: userId,
					key: data.api_key,
					name: data.name,
					secret: data.api_secret,
				},
				{
					onSuccess() {
						getExchangesQuery.refetch();
						setShowForm(!showForm);
					},
					onError(err) {
						alert(err);
					},
				}
			);
		}
	};

	return (
		<div className="p-2 my-3 bg-gray-700 border">
			{showForm ? (
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
								errors.name ? 'border-red-500' : ''
							}`}
							placeholder="Exchange Name"
							{...register('name', { required: true })}
						/>
						<input
							className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
								errors.api_key ? 'border-red-500' : ''
							}`}
							placeholder="Api Key"
							{...register('api_key', { required: true })}
						/>
						<input
							className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
								errors.api_secret ? 'border-red-500' : ''
							}`}
							placeholder="Api Secret"
							{...register('api_secret', { required: true })}
						/>
						{!isNew && (
							<label>
								Active?
								<input
									className={`block px-4 py-3 mb-3 leading-tight border rounded appearance-none`}
									placeholder=""
									{...register('active')}
									type="checkbox"
								/>
							</label>
						)}
						{!isNew && (
							<button
								type="button"
								onClick={() => setShowForm(!showForm)}
								className="px-8 py-2 mr-3 text-sm font-bold text-center uppercase bg-red-600 rounded-md"
							>
								Cancel
							</button>
						)}

						<input
							type="submit"
							className="px-8 py-2 text-sm font-bold text-center text-white uppercase rounded-md hover:cursor-pointer bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50"
						/>
					</form>
				</div>
			) : (
				<div>
					<h3>{name}</h3>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-blue-400 hover:cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						onClick={() => setShowForm(!showForm)}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				</div>
			)}
		</div>
	);
}
