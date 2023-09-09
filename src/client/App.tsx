import React, {useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';

import Routes from '@client/modules/routes/Routes';
import { AppThemeProdvider } from '@client/modules/layouts';
import {Container} from '@client/modules/components/shared';
import { Header } from '@client/modules/components/global';
import { useRefreshToken } from '@api/endpoints/blog/auth/authorization';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '@general-infrastructure/constants/cookies';
import {AuthContext} from '@client/modules/authorization/context';
import { DefferedStoreProvider } from '@general-infrastructure/libs/deffered/defferedComponents/context/context';
import { DefferdStoreClient } from '@general-infrastructure/libs/deffered';


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
		<DefferedStoreProvider defferedStore={new DefferdStoreClient()}>
			<AuthContext.Provider value={{
				isAuthorized,
				isLoading,
				hasRefreshCookie: !!cookieStore.get(REFRESH_TOKEN),
			}}>
				<AppThemeProdvider>
					<Container>
						<Header />
						<div>
							<Link to="/overview">Overview</Link>
							<Link to="/lazy">lazy</Link>
							<Link to="/super-private-page">SUPER PRIVATE DONT CLICK</Link>
							<Link to="/microfronted/home">Microfrontend home</Link>
							<Routes />
						</div>
					</Container>
				</AppThemeProdvider>
			</AuthContext.Provider>
		</DefferedStoreProvider>

	);
};

export default App;