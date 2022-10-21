import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Overview, Feed } from '@client/modules/pages';
import { LazyLoad } from '@client/libs/LazyComponents';

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
		],
	);
	return (
		<Suspense fallback="Loading...">
			{AppRoutes}
		</Suspense>
	);
};

export default Routes;