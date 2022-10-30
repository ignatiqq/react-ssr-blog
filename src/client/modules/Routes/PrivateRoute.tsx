import React, { useContext } from 'react';
import { AuthContext } from '@client/modules/authorization/context';
import { NotFound } from '@client/modules/components/global';

interface PrivateRouteType {
    Component: React.FC<any>
}

const PrivateRoute: React.FC<PrivateRouteType> = ({Component}) => {

	const {isAuthorized, isLoading} = useContext(AuthContext);

	if(!isLoading && !isAuthorized) {
		return <NotFound />;
	}

	return (
		<Component />
	);
};

export default PrivateRoute;