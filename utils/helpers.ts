const defaultCurrencyOptions = {
	significantDigits: 2,
	thousandsSeparator: ',',
	decimalSeparator: '.',
	symbol: '$',
};

export function currencyFormatter(value) {
	if (typeof value !== 'number') value = 0.0;
	const options = { ...defaultCurrencyOptions };
	value = value.toFixed(options.significantDigits);

	const [currency, decimal] = value.split('.');
	return `${options.symbol} ${currency.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		options.thousandsSeparator
	)}${options.decimalSeparator}${decimal}`;
}
