import React, { useContext } from 'react';
import { AuthContext } from '@client/modules/authorization/context';
import { NotFound } from '@client/modules/components/global';
import cookieStore from '@general-infrastructure/stores/cookieStore/client/cookieStore';
import { REFRESH_TOKEN } from '@general-infrastructure/constants/cookies';

interface PrivateRouteType {
    Component: React.FC<any>
}

const PrivateRoute: React.FC<PrivateRouteType> = ({Component}) => {

	const {isAuthorized, isLoading, hasRefreshCookie} = useContext(AuthContext);

	if(!hasRefreshCookie && !isAuthorized) {
		return <NotFound />;
	}

	if(isLoading && hasRefreshCookie) {
		return <div>Loading...</div>;
	}

	return (
		<Component />
	);
};

export default PrivateRoute;