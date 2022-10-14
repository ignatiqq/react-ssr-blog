import React from 'react';
import { Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query';

import App from '@client/App';

interface RenderOptions {
	url: string;
	queryClient: QueryClient;
	// TODO MUST TO TYPE IT
	dehydratedState: {[key: string]: any};
}

const render = (res: Response, options: RenderOptions) => {
	const {url, queryClient, dehydratedState} = options;

	let didError = false;
	
	const stream = renderToPipeableStream(
		<StaticRouter location={url}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={dehydratedState}>
					<App />
				</Hydrate>
			</QueryClientProvider>
		</StaticRouter>,
	);
};