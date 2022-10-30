import React, { Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Routes from '@client/modules/Routes/Routes';
import { AppThemeProdvider } from '@client/modules/layouts';
import {Container} from '@client/modules/components/shared';
import { Header } from '@client/modules/components/global';
import { useRefreshToken } from '@api/endpoints/blog/auth/authorization';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';
import { REFRESH_TOKEN } from '@general-infrastructure/constants/cookies';
import {AuthContext} from '@client/modules/authorization/context';


const App: React.FC = () => {
	const {isLoading, data} = useRefreshToken({enabled: !!cookieStore.get(REFRESH_TOKEN)});

	const isAuthorized = useMemo(() => isLoading ? false : !!data?.data?.refreshToken, [isLoading, data]);

	const authContext = {
		isAuthorized,
		isLoading,
	};

	return (
		// @TODO add error boundary
		<Suspense fallback={'Loading...'}>
			<AuthContext.Provider value={authContext}>
				<AppThemeProdvider>
					<Container>
						<Header />
						<div>
							<Link to="/overview">Overview</Link>
							<Link to="/lazy">lazy</Link>
							<Routes />
						</div>
					</Container>
				</AppThemeProdvider>
			</AuthContext.Provider>
		</Suspense>
	);
};

export default App;