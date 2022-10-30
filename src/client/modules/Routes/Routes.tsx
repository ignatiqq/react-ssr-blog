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

const Routes: React.FC = () => {
	const AppRoutes =  useRoutes(
		[
			{path: '/', element: <Feed />},
			{path: '/lazy', element: (
				<LazyLoad<{hello: string}>
					render={(Component) => <Component hello="dfgd" />}
					load={() => import(/* webpackChunkName: "LazyLoadChunk" */ '@client/modules/pages/Lazy/Lazy')}
				/>
			)},
			{path: '/overview', element: <Overview.component />},
			{path: '/super-private-page', element: <PrivateRoute Component={SuperPrivatePage} />},
		],
	);
	return (
		<Suspense fallback="Loading...">
			{AppRoutes}
		</Suspense>
	);
};

export default Routes;