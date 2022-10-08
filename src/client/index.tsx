import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

import './styles/index.scss';
import App from './App';

const container = document.getElementById('root') as HTMLElement;

const dehydratedState = (window as any).__REACT_QUERY_STATE__;
export const queryClient = new QueryClient();

hydrateRoot(
	container,
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Hydrate state={JSON.parse(dehydratedState)}>
				<App />
			</Hydrate>
		</QueryClientProvider>
	</BrowserRouter>,
);