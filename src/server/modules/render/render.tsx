import React from 'react';
import fs from 'fs';
import path from 'path';
import { Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query';

import { ABORT_DELAY } from '@server/constants/render';
import App from '@client/App';
import { ErrorType } from '@server/types';

interface RenderOptions {
	url: string;
	queryClient: QueryClient;
	// TODO MUST TO TYPE IT
	queryState: string;
	title: string;
}

const render = (res: Response, options: RenderOptions) => {
	const {url, queryClient, queryState, title} = options;

	const manifest = fs.readFileSync(
		path.join(__dirname, 'static/manifest.json'),
		'utf-8',
	);

	// assets html data
	const assets = JSON.parse(manifest);
	const assetsHtmlData = {
		assets,
		title,
	};
	const globalStatements = {
		__REACT_QUERY_STATE__: queryState,
		__HTML_ASSETS__: JSON.stringify(assetsHtmlData),
	};
	let didError = false;

	const assetsWithGlobalStatements = {
		...assetsHtmlData,
		globalStatements,
	};

	const stream = renderToPipeableStream(
		<StaticRouter location={url}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={queryState}>
					<App HTMLData={assetsWithGlobalStatements} />
				</Hydrate>
			</QueryClientProvider>
		</StaticRouter>,
		{
			onShellReady() {
				res.statusCode = didError ? 500 : 200;
				res.setHeader('Content-type', 'text/html');
				stream.pipe(res);
			},
			onError(err) {
				didError = true;
				console.error((err as ErrorType).message);
			},
		},
	);

	setTimeout(() => {
		stream.abort();
	}, ABORT_DELAY);
};

export default render;