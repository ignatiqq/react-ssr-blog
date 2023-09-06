import { Response } from 'express';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router-dom';
import serializeJavascript from 'serialize-javascript';

import { IRouteType } from '@general-infrastructure/routes/types';
import { getReactQueryState } from '@server/infrastructure/requestDataHandlers/getQueryState';
import { renderToStream } from '@server/modules/render/render';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';
import { REFRESH_TOKEN } from '@general-infrastructure/constants/cookies';
import { queryRequestsCreator } from '@general-infrastructure/libs/query';
import { queryRefreshRequestData } from '@api/endpoints/blog/auth/authorization';
import { ResponseManagersType } from '@server/types';
import { streamChunks } from '@server/modules/streamChunks/streamChunks';
import { preapareHeadHtml } from '@server/modules/sendHead';


async function handleRequest(
	url: string,
	res: Response,
	routes: IRouteType[],
	managers: ResponseManagersType): Promise<void> {
	// set all header
	res.setHeader('Content-type', 'text/html');

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

		const queryState = serializeJavascript(dehydratedState);

		// add head to response stream
		const head = preapareHeadHtml({queryState, title: activeRoute.title});


		// ----
		managers.responseStream.pipe(res);
		// res.pipe(managers.responseStream);
		// ----

		res.setHeader('Content-type', 'text/html');
		// send {head} to reponseStream
		res.write(`<html lang="en">${head}<body><div id="root">`);


		// ПАЙПИТЬ СРАЗУ ИЛИ НЕТ НЕ ОЧ ПОНЯТНО
		// НУЖНО УЗНАТЬ СРОК ЖИЗНИ СТРИМА
		// res.pipe(managers.responseStream);

		renderToStream(res, {
			url,
			queryState,
			queryClient: queryClient,
		}, managers)
		// then flow after we collected all react chunks
			.then(() => {{
				queryClient.clear();

				console.log(managers.taskManager);

				// отправить все чанки в стрим клиенту после
				// заврешения всех деферред промисов
				// тоесть отослать все саспесны
				// и достримить промисы с ответами на клиент
				streamChunks(res, managers);
			}})
			// TODO ADD CATCH STATE
			.catch(() => {});


	} else {
		// TODO Rewrite on show react app with error page
		res.statusCode = 404;
		res.setHeader('Content-type', 'text/html');
		res.end('<h2>Oops page not found</h2>');
	}
}

export default handleRequest;