import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Overview, Feed } from '@client/modules/pages';
import LazyLoad from '@client/libs/LazyComponents/modules/LazyLoad/LazyLoad';
import PrivateRoute from './PrivateRoute';

const SuperPrivatePage = React.lazy(
	() => import(/* webpackChunkName: "SuperPrivatePageChunk" */
		'@client/modules/pages/SuperPrivatePage/SuperPrivatePage'
	),
);

const Homepage = React.lazy(() => import('homePage/Homepage'));

const Routes: React.FC = () => {
	const AppRoutes = useRoutes(
		[
			{path: '/', element: <Feed />},
			{path: '/lazy', element: (
				<LazyLoad<{hello: string}>
					render={(Component) => <Component hello="dfgd" />}
					load={() => import(/* webpackChunkName: "LazyLoadChunk" */ '@client/modules/pages/Lazy/Lazy')}
				/>
			)},
			{path: '/lazy1', element: (
				<LazyLoad<{hello: string}>
					render={(Component) => <Component hello="dfgd" />}
					load={() => import(/* webpackChunkName: "LazyLoadChunk2" */ '@client/modules/pages/Lazy2/Lazy2')}
				/>
			)},
			{path: '/overview', element: <Overview.component />},
			{path: '/super-private-page', element: <PrivateRoute Component={SuperPrivatePage} />},
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