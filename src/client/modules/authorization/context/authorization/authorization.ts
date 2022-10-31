import { REFRESH_TOKEN } from '@general-infrastructure/constants/cookies';
import cookieStore from '@general-infrastructure/stores/cookieStore/client/cookieStore';
import React from 'react';

const AuthContext = React.createContext({
	isAuthorized: false,
	isLoading: false,
	hasRefreshCookie: !!cookieStore.get(REFRESH_TOKEN),
});

export default AuthContext;