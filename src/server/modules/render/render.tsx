import React from 'react';
import { Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query';

import { ABORT_DELAY } from '@server/constants/render';
import { ResponseManagersType } from '@server/types';
import { HtmlToStreamWriteable } from '../htmlToStreamWriteable/htmlToStreamWriteable';
import { Deffered, DefferedStoreServer } from '@general-infrastructure/libs/deffered';
import { DefferedStoreProvider } from '@general-infrastructure/libs/deffered/defferedComponents/context/context';
import { serializer } from '@general-infrastructure/libs/serializer';
import { ScriptResolver } from '@general-infrastructure/libs/deffered/scriptResolver/scriptResolver';

interface RenderOptions {
	url: string;
	queryClient: QueryClient;
	queryState: string;
}

// https://github.com/reactwg/react-18/discussions/114
// client bootstrap.tsx
const BOOTSTRAP_BEFORE_HYDRATE_SCRIPT_STRING =
'typeof window._HYDRATE === function ? window._HYDRATE() : window._HYDRATE = true';

export const renderToStream = async (res: Response, options: RenderOptions, managers: ResponseManagersType) => {
	const {url, queryClient, queryState} = options;
	const {responseStream, taskManager} = managers;

	const htmlToResponseStreamWriter = new HtmlToStreamWriteable(responseStream, taskManager);

	const onEndRenderPromise = new Deffered();

	// deffered promise for the onAllReady stream resolved
	const defferedStreamReady = new Deffered();

	// we should to add promise ("UNRESOLVED") to task manager
	// we will resolve it only after all our tasks in taskManager is done
	// (when we sent all of our promises to client)
	// in the TaskManager we will have pool of react html chunks
	// from the renderToPipeable stream (we will pipe to htmWriter from "rendertps" pipe)
	taskManager.push(() => {
		return defferedStreamReady.promise;
	});

	let didError = false;

	// script resolver for deffered scripts sending functionalluity
	const scriptResolver = new ScriptResolver(res);

	import('@client/App').then(data => {
		const App = data.default;

		// render <div id="root">HTML</div>
		const stream = renderToPipeableStream(
			<DefferedStoreProvider defferedStore={new DefferedStoreServer(serializer, scriptResolver)}>
				<StaticRouter location={url}>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={JSON.parse(queryState)}>
							<App />
						</Hydrate>
					</QueryClientProvider>
				</StaticRouter>
			</DefferedStoreProvider>
			,
			{
				bootstrapScripts: [BOOTSTRAP_BEFORE_HYDRATE_SCRIPT_STRING],
				onShellReady() {
					res.statusCode = didError ? 500 : 200;
					// pipe not to actuall node js response
					// pipe to HtmlWriter => TaskManager
					stream.pipe(htmlToResponseStreamWriter);

					// after we collect all react stream chunks
					// we will exit the render function
					// by resolving the promise
					onEndRenderPromise.resolve();
				},
				onAllReady() {
					// set our last (after all streamed chunks) promise to resolve
					defferedStreamReady.resolve();
				},
				onError(err) {
					didError = true;
					// reject((err as ErrorType).message);
				},
			},
		);

		setTimeout(() => {
			stream.abort();
		}, ABORT_DELAY);
	});

	return onEndRenderPromise.promise;
};
