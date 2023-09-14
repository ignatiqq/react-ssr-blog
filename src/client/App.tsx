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
			{/* @TODO НЕЗАКОНЧЕННЫЙ СТРИМ НЕ ДОЛЖЕН ВЫЗЫВАТЬ ОШИБКУ ГИДРАЦИЙ ПРИ ВЗАИМОДЕЙСТВИИ, ТАК КАК
			ЭТО ЕГО ОСНОВНАЯ КОНЦЕПЦИЯ КАК И ОПИСАНО В СТАТЬЕ ДЕНА ОБРАМОВА НА ЭТУ ТЕМУ, УЗНАТЬ
			ПОЧЕМУ У МЕНЯ СЕТ СТЕЙТ ЛОМАЕТ НЕЗАКОНЧЕННЫЙ СТРИМ СВИТЧ НА КЛИЕНТ РЕННДЕРИНГ 
			// Tramvai Realization:
			https://github.com/tramvaijs/tramvai/commit/c6414a2e667c89b1891377b0c2f2433e8915e629
			*/}
			<Content />
		</AuthContext.Provider>

	);
};

export default App;