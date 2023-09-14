import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

import './styles/index.scss';
import App from './App';

const container = document.getElementById('root') as HTMLElement;

// @TODO DECLARE WINDOW TYPE
const dehydratedState = (window as any).__REACT_QUERY_STATE__;
export const queryClient = new QueryClient();

const hydrate = () => {
	hydrateRoot(
		container,
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={dehydratedState}>
					<App />
				</Hydrate>
			</QueryClientProvider>
		</BrowserRouter>,
	);
};

console.log('123');

// @ts-ignore
if(!window._HYDRATE) {
	// это означает что скрипт загрузился быстрее
	// потомучто скрипт пришел, а сервер еще не установил window._HYDRATE
	// значит в этом случае бутстрап скрипт пришел вызов фнукции = <script>window._HYDRATE();</script>
	// @ts-ignore
	window._HYDRATE = hydrate;
} else {
	// if shell loaded faster than script
	// это означает что сервер уже установил window._HYDRATE = true = <script>window._HYDRATE = true</script>
	hydrate();
}
