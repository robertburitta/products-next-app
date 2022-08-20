import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/globals.scss';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<title>Products Next App</title>
				<meta name="description" content="Products Next App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}