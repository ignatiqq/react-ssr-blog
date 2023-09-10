import React, {useEffect, useMemo} from 'react';

import { useRefreshToken } from '@api/endpoints/blog/auth/authorization';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '@general-infrastructure/constants/cookies';
import {AuthContext} from '@client/modules/authorization/context';
import { Content } from './content';


const App: React.FC = () => {
	const {isLoading, data} = useRefreshToken({
		enabled: !!cookieStore.get(REFRESH_TOKEN),
		retry: 1,
		onError: () => {
			cookieStore.remove(REFRESH_TOKEN);
			cookieStore.remove(ACCESS_TOKEN);
		},
	});

	useEffect(() => {
		const refreshToken = data?.data?.refreshToken;
		if(refreshToken) {
			cookieStore.set(REFRESH_TOKEN, refreshToken);
		}
	}, [data]);

	const isAuthorized = useMemo(() => isLoading ? false : !!data?.data?.refreshToken, [isLoading, data]);

	return (
		<AuthContext.Provider value={{
			isAuthorized,
			isLoading,
			hasRefreshCookie: !!cookieStore.get(REFRESH_TOKEN),
		}}>
			<Content />
		</AuthContext.Provider>

	);
};

export default App;