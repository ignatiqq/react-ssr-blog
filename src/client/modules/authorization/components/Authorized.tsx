import React, { useContext } from 'react';
import { AuthContext } from '@client/modules/authorization/context';

interface Authorized {
    children: React.ReactNode;
}

const Authorized: React.FC<Authorized> = ({
	children,
}) => {

	const {isAuthorized} = useContext(AuthContext);

	if(!isAuthorized) {
		return null;
	}

	return (
		<>
			{children}
		</>
	);
};

export default Authorized;