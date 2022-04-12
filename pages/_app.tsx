import '@/styles/main.css';
import '@/styles/prism.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import BaseLayout from '@/layouts/base-layout';
import { UserContextProvider } from '@/utils/user-context';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<ThemeProvider attribute="class" enableSystem={false}>
				<BaseLayout>
					<Component {...pageProps} />
				</BaseLayout>
			</ThemeProvider>
		</UserContextProvider>
	);
}
