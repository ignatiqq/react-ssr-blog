import React from 'react';
import { Response } from 'express';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router-dom';
import serializeJavascript from 'serialize-javascript';

import { IRouteType } from '@general-infrastructure/routes/types';
import { getReactQueryState } from '@server/infrastructure/requestDataHandlers/getQueryState';
import render from '@server/modules/render/render';

async function handleRequest(url: string, res: Response, routes: IRouteType[]): Promise<void> {
	const activeRoute = routes.find((route) => matchPath(route.path, url));

	if(activeRoute) {
		let dehydratedState: ReturnType<typeof dehydrate>| null = null;
		const queryClient = new QueryClient();

		if(activeRoute?.initialData?.getInitialQueryData) {
			dehydratedState = await getReactQueryState(
				queryClient,
				activeRoute.initialData?.getInitialQueryData,
			);
		}

		render(res, {
			url,
			queryState: serializeJavascript(dehydratedState),
			queryClient: queryClient,
			title: activeRoute.title,
		});

		queryClient.clear();

	} else {
		// TODO Rewrite on show react app with error page
		res.statusCode = 404;
		res.setHeader('Content-type', 'text/html');
		res.end('<h2>Oops page not found</h2>');
	}
}

export default handleRequest;