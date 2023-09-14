import React, {Suspense, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';

import Routes from '@client/modules/routes/Routes';
import { AppThemeProdvider } from '@client/modules/layouts';
import {Container} from '@client/modules/components/shared';
import { Header } from '@client/modules/components/global';
import { useRefreshToken } from '@api/endpoints/blog/auth/authorization';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '@general-infrastructure/constants/cookies';
import {AuthContext} from '@client/modules/authorization/context';

import s from './css.module.css';

const App: React.FC = () => {
	const {isLoading, data} = useRefreshToken({
		enabled: !!cookieStore.get(REFRESH_TOKEN),
		retry: 1,
		onError: () => {
			cookieStore.remove(REFRESH_TOKEN);
			cookieStore.remove(ACCESS_TOKEN);
		},
	});

	if(typeof window !== 'undefined') {
		console.log('HYDRATION RENDER: ', [...document.querySelectorAll('*')]);
	}

	useEffect(() => {
		const refreshToken = data?.data?.refreshToken;
		if(refreshToken) {
			cookieStore.set(REFRESH_TOKEN, refreshToken);
		}
		console.log('after render: ', [...document.querySelectorAll('*')]);
	}, [data]);

	const isAuthorized = useMemo(() => isLoading ? false : !!data?.data?.refreshToken, [isLoading, data]);

	return (
		// @TODO add error boundary
		<>
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
							{new Array(100).fill(<div></div>).map((node, i) => <div key={i}></div>)}
							<Routes />
							{new Array(100).fill(<div></div>).map((node, i) => <div key={i}></div>)}
						</div>
					</Container>
				</AppThemeProdvider>
			</AuthContext.Provider>
		</>
	);
};

export default App;