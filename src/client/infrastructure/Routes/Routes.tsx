import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Overview, Feed } from '@client/modules/pages';
import LazyLoad from '@client/libs/LazyComponents/modules/LazyLoad/LazyLoad';
// const Lazy = React.lazy(() => import(/* webpackChunkName: "teststetet" */ '@client/modules/pages/Lazy/Lazy'));

const Routes: React.FC = () => {
	const AppRoutes =  useRoutes(
		[
			{path: '/', element: <Feed />},
			{path: '/lazy', element: (
				// <Lazy hello='123' />
				<LazyLoad<{hello: string}>
					render={(Component) => <Component hello="dfgd" />}
					load={() => import(/* webpackChunkName: "LazyLoadChunk" */ '@client/modules/pages/Lazy/Lazy')}
				/>
			)},
			{path: '/overview', element: <Overview.component />},
		],
	);
	return (
		<Suspense fallback="Loading...">
			{AppRoutes}
		</Suspense>
	);
};

export default Routes;