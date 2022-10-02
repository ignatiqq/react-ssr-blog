import React from 'react';
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { matchPath } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';


// utils
import { IRouteType } from "../routes/types";
import App from '../../client/App';

async function handleRequest(url: string, routes: IRouteType[]) {
    const activeRoute = routes.find((route) => matchPath(route.path, url));
    let queryClient = new QueryClient();
    let dehydratedState;

    if(activeRoute?.getInitialData) {
        await activeRoute.getInitialData(queryClient);
        dehydratedState = dehydrate(queryClient);
    }

    const component = ReactDOMServer.renderToString(
        <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
                <App />
            </Hydrate>
        </QueryClientProvider>
    );

    console.log(dehydratedState);

    return {
        component,
        state: dehydratedState,
    }
}

export default handleRequest;