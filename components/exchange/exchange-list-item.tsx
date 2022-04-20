import { Exchange } from '@/types/exchange';
import * as React from 'react';
import { useForm } from 'react-hook-form';

const ExchangeForm = ({
	name,
	key,
	secret,
	active,
}: {
	name: string;
	key: string;
	active: boolean;
	secret: string;
}) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Exchange>({
		defaultValues: {
			name,
			key,
			secret,
			active,
		},
	});

	React.useEffect(() => {
		reset({
			name,
			key,
			secret,
			active,
		});
	}, [reset, name, key, secret, active]);

	const onSubmit = (data: Exchange) => {
		console.log('exchange saved', data);
	};

	return (
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
					errors.key ? 'border-red-500' : ''
				}`}
				placeholder="Api Key"
				{...register('key', { required: true })}
			/>
			<input
				className={`block w-full px-4 py-3 mb-3 leading-tight bg-white border rounded appearance-none dark:text-white dark:bg-gray-900 focus:outline-none dark:focus:bg-gray-800 ${
					errors.secret ? 'border-red-500' : ''
				}`}
				placeholder="Api Secret"
				{...register('secret', { required: true })}
			/>
			<label>
				Active?
				<input
					className={`block px-4 py-3 mb-3 leading-tight border rounded appearance-none
          ${errors.active ? 'border-red-500' : ''}`}
					placeholder=""
					{...register('active', { required: true })}
					type="checkbox"
				/>
			</label>

			<input type="submit" />
		</form>
	);
};

export { ExchangeForm };
