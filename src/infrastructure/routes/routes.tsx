import React from 'react';
import { IRouteType } from './types';
import {Overview} from '@client/modules/pages';

// изобрел блинь react-helmet дурак
const routes: IRouteType[] = [
	{
		path: '/',
		title: 'Main page',
	},
	{
		path: '/overview',
		title: 'Overview',
		initialData: Overview.initialData,
	},
	{
		path: '/feed',
		title: 'Feed',
	},
	{
		path: '/lazy',
		title: 'Lazy page',
	},
	{
		path: '/super-private-page',
		title: 'PRIVATE!!!',
	},
	{
		path: '/lazycss',
		title: 'LazyCSs',
	},
	{
		path: '/microfronted/home',
		title: 'microfront',
	},
];

export {
	routes,
};