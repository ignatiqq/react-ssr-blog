import axios from "axios";

import createInitialQueryRequest from '../initDataCreators/query';
import { IRouteType } from "./types";
import {Feed, Overview} from '../../client/modules/pages';
import { QueryClient } from "@tanstack/react-query";

const routes: IRouteType[] = [
    {
        path: '/',
        component: Overview,
    },
    {
        path: '/feed',
        component: Feed,
        getInitialData: (queryClient: QueryClient) => createInitialQueryRequest<{id: number, title: string}[]>(queryClient, {key: ['todos'], fn: () => axios.get('https://jsonplaceholder.typicode.com/todos')}),
    }
]

export default routes;