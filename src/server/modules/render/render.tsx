import React from 'react';
import { Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';

import App from '@client/App';

const render = (res?: Response, options: any) => {
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