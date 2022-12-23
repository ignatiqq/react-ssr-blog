import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Overview, Feed } from '@client/modules/pages';
import LazyLoad from '@client/libs/LazyComponents/modules/LazyLoad/LazyLoad';
import PrivateRoute from './PrivateRoute';
import { DynamicModuleLoader } from '@client/libs/Microfrontends/DynamicModuleLoader';
const SuperPrivatePage = React.lazy(
	() => import(/* webpackChunkName: "SuperPrivatePageChunk" */
		'@client/modules/pages/SuperPrivatePage/SuperPrivatePage'
	),
);

import { HOMEPAGE_MICROFRONT } from '@client/constants/microfrontends';

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
			{path: '/overview', element: <Overview.component />},
			{path: '/super-private-page', element: <PrivateRoute Component={SuperPrivatePage} />},
			{
				path: '/microfronted/home',
				element: (
					<DynamicModuleLoader
						url={HOMEPAGE_MICROFRONT.url}
						module={HOMEPAGE_MICROFRONT.components['HomePage']}
						containerName={HOMEPAGE_MICROFRONT.containerName}
					/>
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