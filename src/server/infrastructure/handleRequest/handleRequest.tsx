import React from 'react';
import { Response } from 'express';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router-dom';
import serializeJavascript from 'serialize-javascript';

import { IRouteType } from '@general-infrastructure/routes/types';
import { getReactQueryState } from '@server/infrastructure/requestDataHandlers/getQueryState';
import render from '@server/modules/render/render';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';
import { REFRESH_TOKEN } from '@general-infrastructure/constants/cookies';
import { queryRequestsCreator } from '@general-infrastructure/libs/query';
import { queryRefreshRequestData } from '@api/endpoints/blog/auth/authorization';

async function handleRequest(url: string, res: Response, routes: IRouteType[]): Promise<void> {
	const activeRoute = routes.find((route) => matchPath(route.path, url));

	if(activeRoute) {
		let dehydratedState: ReturnType<typeof dehydrate> | null = null;
		const queryClient = new QueryClient();

		const queryRequests = [
			...(activeRoute.initialData?.getInitialQueryData ? activeRoute.initialData.getInitialQueryData : []),
			...(!!cookieStore.get(REFRESH_TOKEN) ? queryRequestsCreator(queryRefreshRequestData) : []),
		];

		if(queryRequests.length > 0) {
			dehydratedState = await getReactQueryState(
				queryClient,
				queryRequests,
			);
		}

		render(res, {
			url,
			queryState: serializeJavascript(dehydratedState),
			queryClient: queryClient,
			title: activeRoute.title,
		}).then((responseStream) => {
			// @ts-ignore
			responseStream.push('</div></body></html>');
			res.end();
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