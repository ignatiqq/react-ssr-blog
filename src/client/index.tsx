import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

import './styles/index.scss';
import App from './App';

// TODO DECLARE WINDOW TYPE
const dehydratedState = (window as any).__REACT_QUERY_STATE__;
const globalHTMLAssets = JSON.parse((window as any).__HTML_ASSETS__ || '');
export const queryClient = new QueryClient();

hydrateRoot(
	document,
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Hydrate state={dehydratedState}>
				<App HTMLData={globalHTMLAssets} />
			</Hydrate>
		</QueryClientProvider>
	</BrowserRouter>,
);