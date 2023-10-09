import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Overview, Feed } from '@client/modules/pages';
import LazyLoad from '@client/libs/LazyComponents/modules/LazyLoad/LazyLoad';
import PrivateRoute from './PrivateRoute';
import { DynamicModuleLoader } from '@client/libs/Microfrontends/DynamicModuleLoader';
import { HOMEPAGE_MICROFRONT } from '@client/constants/microfrontends';
import { dynamicLoad } from '@general-infrastructure/libs/criticalStyles';

const SuperPrivatePage = dynamicLoad(
	() => import(/* webpackChunkName: "SuperPrivatePageChunk" */
		'@client/modules/pages/SuperPrivatePage/SuperPrivatePage'
	),
	'SuperPrivatePageChunk',
);
const LazyLoadChunk = dynamicLoad(
	() => import(/* webpackChunkName: "LazyLoadChunk" */ '@client/modules/pages/Lazy/Lazy'),
	'LazyLoadChunk',
);

const Homepage = React.lazy(() => import('homePage/Homepage'));

const Routes: React.FC = () => {
	const AppRoutes = useRoutes(
		[
			{path: '/', element: <Feed />},
			{path: '/lazy', element: (
				<Suspense fallback="loading">
					{/* @ts-ignore */}
					<LazyLoadChunk hello='dfgd' />
				</Suspense>
				// <LazyLoad<{hello: string}>
				// 	render={(Component) => <Component hello="dfgd" />}
				// 	load={() => import(/* webpackChunkName: "LazyLoadChunk" */ '@client/modules/pages/Lazy/Lazy')}
				// />
			)},
			{path: '/overview', element: <Overview.component />},
			{path: '/super-private-page', element: (
				<Suspense fallback="private">
					{/* @ts-ignore */}
					<PrivateRoute Component={SuperPrivatePage} />
				</Suspense>
			)},
			{path: '/lazycss', element:
			<LazyLoad
				render={(Component) => <>
					<Component />
				</>}
				load={() => import(/* webpackChunkName: "LazyTestComponent" */ '@client/lazyTestcomponent')}
			/>,
			},
			{
				path: '/microfronted/home',
				element: (
					<Homepage />
				),
			},
		],
	);
	return (
		<Suspense fallback="Loading...">
			{AppRoutes}
		</Suspense>
	);
};

export default Routes;