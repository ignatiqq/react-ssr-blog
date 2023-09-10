import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

import './styles/index.scss';
import App from './App';
import { DefferedStoreProvider } from '@general-infrastructure/libs/deffered/defferedComponents/context/context';
import { DefferdStoreClient } from '@general-infrastructure/libs/deffered';

const container = document.getElementById('root') as HTMLElement;

const dehydratedState = window.__REACT_QUERY_STATE__;

export const queryClient = new QueryClient();

const renderer = () => {

	const hydrate = () => {
		hydrateRoot(
			container,
			<DefferedStoreProvider defferedStore={new DefferdStoreClient()}>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={dehydratedState}>
							<App />
						</Hydrate>
					</QueryClientProvider>
				</BrowserRouter>
			</DefferedStoreProvider>
			,
		);
	};

	// we dont want to hydrate before the shell https://github.com/reactwg/react-18/discussions/114
	// if script loaded faster than shell of the app
	if(!window._HYDRATE) {
		// это означает что скрипт загрузился быстрее
		// потомучто скрипт пришел, а сервер еще не установил window._HYDRATE
		// значит в этом случае бутстрап скрипт пришел вызов фнукции = <script>window._HYDRATE();</script>
		window._HYDRATE = hydrate;
	} else {
		// if shell loaded faster than script
		// это означает что сервер уже установил window._HYDRATE = true = <script>window._HYDRATE = true</script>
		hydrate();
	}
};

renderer();
