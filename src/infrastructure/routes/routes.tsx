import axios from 'axios';

import createInitialQueryRequest from '@client/infrastructure/initDataCreators/query';
import { IRouteType } from './types';
import {Feed, Overview} from '@client/modules/pages';
import { QueryClient } from '@tanstack/react-query';
import App from '@client/App';
import { useRoutes } from 'react-router-dom';

const routes: IRouteType[] = [
	{
		path: '/',
		component: App,
	},
	{
		path: '/overview',
		...Overview,
	},
	{
		path: '/feed',
		component: Feed,
	},
];

const clientRoutes = useRoutes(routes);

export {
	routes,
	clientRoutes,
};