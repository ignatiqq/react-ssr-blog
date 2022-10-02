import React from "react";

import { IRouteType } from "../../types/routes";
import {Feed, Overview} from '../modules/pages';

const routes: IRouteType[] = [
    {
        path: '/',
        component: Overview,
    },
    {
        path: '/feed',
        component: Feed,
        getInitialData: () => Promise.resolve([{id: 1, title: 'Hello'}, {id: 2, title: 'Bello world'}]),
    }
]

export default routes;