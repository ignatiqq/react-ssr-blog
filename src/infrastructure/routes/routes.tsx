import React from 'react';
import { IRouteType } from './types';
import {Feed, Overview} from '@client/modules/pages';
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

const Routes: React.FC = () => {
	return useRoutes([
		{path: '/', element: <Feed />},
		{path: '/overview', element: <Overview.component />},
	]);
};

export {
	routes,
	Routes,
};