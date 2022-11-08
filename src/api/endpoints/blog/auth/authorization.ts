import { useAppMutation, useAppQuery } from '@client/libs/query';
import type { Response } from '@api/config/types';
import type { BlogApiError } from '../types';

import blogAPI from '../config';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';
import { QueryOptionsType } from '@client/libs/query/useAppQuery';
import { REFRESH_TOKEN } from '@general-infrastructure/constants/cookies';

type LoginDataType = {
    email: string;
    password: string;
};

type UserAuthResponseType = {
	id: string;
	email: string;
}

type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

type AuthorizationResponse = AuthTokens & {
	message: string;
	user: UserAuthResponseType;
}

type RefreshTokenResponse = AuthTokens & {
	user: UserAuthResponseType;
}

const authorization = Object.freeze({
	login({email, password}: LoginDataType): Promise<Response<AuthorizationResponse>> {
		return blogAPI.post('/authorization-by-admin', {email, password});
	},
	refresh(): Promise<Response<RefreshTokenResponse>> {
		return blogAPI.get('/refresh', {
			headers: {
				'Authorization': `Bearer ${cookieStore.get(REFRESH_TOKEN)}`,
			},
		});
	},
});

export const useLogin = ({email, password}: LoginDataType) => {
	return useAppMutation<Response<AuthorizationResponse>, BlogApiError, LoginDataType>(
		() => authorization.login({email, password}),
	);
};

export const useRefreshToken = (options?: QueryOptionsType<Response<RefreshTokenResponse>, BlogApiError>) => {
	return useAppQuery<Response<RefreshTokenResponse>, BlogApiError>(['refresh_token'], authorization.refresh, options);
};

export const queryRefreshRequestData = [
	{
		key: ['refresh_token'],
	 	fn: async () => {
			try {
				const res = await authorization.refresh();
				if(res.data.refreshToken) {
					cookieStore.set(REFRESH_TOKEN, res.data.refreshToken);
				}
				return res.data;
			} catch (error) {
				return (error as Error).message;
			}
		},
	},
];

export default authorization;