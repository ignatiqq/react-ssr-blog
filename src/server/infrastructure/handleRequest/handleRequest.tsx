import React from 'react';
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { matchPath } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import serializeJavascript from 'serialize-javascript';

// utils
import { IRouteType } from "@general-infrastructure/routes/types";
import App from '@client/App';
import { getReactQueryState } from '@server/infrastructure/requestDataHandlers/getQueryState';

interface handleRequestResult {
    component: string;
    __REACT_QUERY_STATE__?: string;
}

async function handleRequest(url: string, routes: IRouteType[]): Promise<handleRequestResult> {
    const activeRoute = routes.find((route) => matchPath(route.path, url));
    let component = '';

    if(activeRoute) {
        let dehydratedState: ReturnType<typeof dehydrate>| null = null;
        const queryClient = new QueryClient();

        if(activeRoute?.initialData?.getInitialQueryData) {
            dehydratedState = await getReactQueryState(queryClient, activeRoute.initialData?.getInitialQueryData);
        }

        component = ReactDOMServer.renderToString(
            <QueryClientProvider client={queryClient}>
                <Hydrate state={dehydratedState}>
                    <App />
                </Hydrate>
            </QueryClientProvider>
        );

        queryClient.clear();
        
        return {
            component,
            __REACT_QUERY_STATE__: JSON.stringify(dehydratedState),
        }
    }
    return {
        component: ''
    }
}

export default handleRequest;