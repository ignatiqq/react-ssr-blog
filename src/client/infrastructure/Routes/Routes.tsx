import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Overview, Feed } from '@client/modules/pages';

const Routes: React.FC = () => {
	return useRoutes([{path: '/', element: <Feed />}, {path: '/overview', element: <Overview.component />}]);
};

export default Routes;