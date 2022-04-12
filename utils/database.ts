import { supabaseAdmin } from './supabase-admin-client';
import { stripe } from './stripe';
import Stripe from 'stripe';

export const getOrCreateCustomer = async (
	uuid: string,
	email: string
): Promise<string | null> => {
	const { data, error: selectError } = await supabaseAdmin
		.from('stripe_customers')
		.select('stripe_customer_id')
		.eq('user_id', uuid)
		.single();

	if (selectError) {
		const customerData = {
			email: email,
			metadata: {
				supabaseUUID: uuid,
			},
		};

		const customer = await stripe.customers.create(customerData);
		const { error: insertError } = await supabaseAdmin
			.from('stripe_customers')
			.insert([
				{
					user_id: uuid,
					stripe_customer_id: customer.id,
				},
			]);

		if (insertError) {
			console.error(insertError);
			return null;
		}

		return customer.id;
	}

	return data?.stripe_customer_id;
};

export const deleteCustomer = async (stripeCustomerId: string) => {
	const { data, error: selectError } = await supabaseAdmin
		.from('stripe_customers')
		.select('user_id')
		.eq('stripe_customer_id', stripeCustomerId)
		.single();

	if (selectError) {
		console.warn(
			`Customer with ID '${stripeCustomerId}' does not exist. Error: ${selectError.message}`
		);
		return;
	}

	const { error: deleteSubscriptionError } = await supabaseAdmin
		.from('subscriptions')
		.delete()
		.match({ user_id: data.user_id });

	if (deleteSubscriptionError) {
		console.warn(
			`Could not delete subscription for customer with ID '${stripeCustomerId}'. Error: ${deleteSubscriptionError.message}`
		);
		return;
	}

	const { error: deleteCustomerError } = await supabaseAdmin
		.from('stripe_customers')
		.delete()
		.match({ stripe_customer_id: stripeCustomerId });

	if (deleteCustomerError) {
		console.warn(
			`Could not delete customer with ID '${stripeCustomerId}'. Error: ${deleteCustomerError.message}`
		);
	} else {
		console.log(`Customer with ID '${stripeCustomerId}' deleted successfully.`);
	}
};

export const upsertProductRecord = async (product: Stripe.Product) => {
	const { error } = await supabaseAdmin.from('products').upsert({
		id: product.id,
		active: product.active,
		name: product.name,
		description: product.description,
		image: product.images?.[0] ?? null,
		metadata: product.metadata,
	});

	if (error) {
		console.error(`Error occurred while saving the product: ${error.message}`);
	} else {
		console.log(`Product saved: ${product.id}`);
	}
};

export const deleteProductRecord = async (product: Stripe.Product) => {
	const { error: priceDeleteError } = await supabaseAdmin
		.from('prices')
		.delete()
		.match({ product_id: product.id });

	if (!priceDeleteError) {
		const { error: productDeleteError } = await supabaseAdmin
			.from('products')
			.delete()
			.match({ id: product.id });

		if (productDeleteError) {
			console.error(
				`Error occurred while deleting the product: ${productDeleteError.message}`
			);
		} else {
			console.log(`Prices and product deleted: ${product.id}`);
		}
	} else {
		console.error(
			`Error occurred while deleting the prices for product: ${priceDeleteError.message}`
		);
	}
};

export const upsertPriceRecord = async (price: Stripe.Price) => {
	const { error } = await supabaseAdmin.from('prices').upsert({
		id: price.id,
		product_id: price.product,
		active: price.active,
		currency: price.currency,
		description: price.nickname,
		type: price.type,
		unit_amount: price.unit_amount,
		interval: price.recurring?.interval ?? null,
		interval_count: price.recurring?.interval_count ?? null,
		trial_period_days: price.recurring?.trial_period_days ?? null,
		metadata: price.metadata,
	});

	if (error) {
		console.error(`Error occurred while saving the price: ${error.message}`);
	} else {
		console.log(`Price saved: ${price.id}`);
	}
};

export const deletePriceRecord = async (price: Stripe.Price) => {
	const { error } = await supabaseAdmin
		.from('prices')
		.delete()
		.match({ id: price.id });

	if (error) {
		console.error(`Error occurred while deleting the price: ${error.message}`);
	} else {
		console.log(`Price deleted: ${price.id}`);
	}
};

export const deleteTrade = async (id: string) => {
	const { error } = await supabaseAdmin
		.from('trades')
		.delete()
		.match({ id: id });

	if (error) {
		console.error(`Error occurred while deleting the trade: ${error.message}`);
	} else {
		console.log(`Trade deleted: ${id}`);
	}
};

export const manageSubscriptionStatusChange = async (
	subscriptionId: string,
	customerId: string,
	createAction = false
) => {
	const {
		data: { user_id: uuid },
		error: noCustomerError,
	} = await supabaseAdmin
		.from('stripe_customers')
		.select('user_id')
		.eq('stripe_customer_id', customerId)
		.single();

	if (noCustomerError) {
		console.error(`Customer with Stripe ID ${customerId} not found.`);
		return;
	}

	const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
		expand: ['default_payment_method'],
	});

	const { error } = await supabaseAdmin.from('subscriptions').upsert({
		id: subscription.id,
		user_id: uuid,
		metadata: subscription.metadata,
		status: subscription.status,
		price_id: subscription.items.data[0].price.id,
		quantity: (subscription as any).quantity,
		cancel_at_period_end: subscription.cancel_at_period_end,
		cancel_at: subscription.cancel_at
			? toDateTime(subscription.cancel_at)
			: null,
		canceled_at: subscription.canceled_at
			? toDateTime(subscription.canceled_at)
			: null,
		current_period_start: toDateTime(subscription.current_period_start),
		current_period_end: toDateTime(subscription.current_period_end),
		created: toDateTime(subscription.created),
		ended_at: subscription.ended_at ? toDateTime(subscription.ended_at) : null,
		trial_start: subscription.trial_start
			? toDateTime(subscription.trial_start)
			: null,
		trial_end: subscription.trial_end
			? toDateTime(subscription.trial_end)
			: null,
	});

	if (error) {
		console.error(
			`An error occurred while saving subscription: ${error.message}`
		);
	} else {
		console.log(`Saved subscription [${subscription.id}] for user [${uuid}]`);
	}

	if (createAction && subscription.default_payment_method)
		await copyBillingDetailsToCustomer(
			uuid,
			subscription.default_payment_method
		);
};

export const updateUserDetails = async (
	customerId: string,
	address: Stripe.Address,
	payment_method: string
) => {
	const {
		data: { user_id: uuid },
		error: noCustomerError,
	} = await supabaseAdmin
		.from('stripe_customers')
		.select('user_id')
		.eq('stripe_customer_id', customerId)
		.single();

	if (noCustomerError) {
		console.error(`Customer with Stripe ID ${customerId} not found.`);
		return;
	}

	if (payment_method) {
		const paymentMethod = await stripe.paymentMethods.retrieve(payment_method);
		const { error: updatePaymentMethodError } = await supabaseAdmin
			.from('user_details')
			.update({
				payment_method: paymentMethod[paymentMethod.type],
			})
			.eq('id', uuid);

		if (updatePaymentMethodError) {
			console.error(
				`An error occurred while updating payment method: ${updatePaymentMethodError.message}`
			);
		}
	}

	if (address) {
		const { error } = await supabaseAdmin
			.from('user_details')
			.update({
				billing_address: address,
			})
			.eq('id', uuid);

		if (error) {
			console.error(
				`An error occurred while updating user details: ${error.message}`
			);
		}
	}
};

const copyBillingDetailsToCustomer = async (
	uuid: string,
	payment_method: Stripe.PaymentMethod | string
) => {
	if (typeof payment_method !== 'string') {
		const { address } = payment_method.billing_details;
		const { error } = await supabaseAdmin
			.from('user_details')
			.update({
				billing_address: address,
				payment_method: payment_method[payment_method.type],
			})
			.eq('id', uuid);

		if (error) {
			console.error(
				`An error occurred while updating user details: ${error.message}`
			);
		}
	}
};

const toDateTime = (secs: number) => {
	return new Date(secs * 1000);
};
