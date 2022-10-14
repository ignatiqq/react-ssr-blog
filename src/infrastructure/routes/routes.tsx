import { IRouteType } from './types';
import {Feed, Overview} from '@client/modules/pages';
import App from '@client/App';

const routes: IRouteType[] = [
	{
		path: '/',
		component: App,
		title: 'Main page',
	},
	{
		path: '/overview',
		title: 'Overview',
		...Overview,
	},
	{
		path: '/feed',
		title: 'Feed',
		component: Feed,
	},
];

export {
	routes,
};