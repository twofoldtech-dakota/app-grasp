/* eslint-disable react/jsx-no-undef */
import '@/styles/main.css';
import '@/styles/prism.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import BaseLayout from '@/layouts/base-layout';
import { UserContextProvider } from '@/utils/user-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="class" enableSystem={false}>
					<BaseLayout>
						<Component {...pageProps} />
						<ReactQueryDevtools />
					</BaseLayout>
				</ThemeProvider>
			</QueryClientProvider>
		</UserContextProvider>
	);
}
