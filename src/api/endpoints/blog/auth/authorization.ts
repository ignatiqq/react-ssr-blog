import { useAppMutation, useAppQuery } from '@client/libs/query';
import type { Response } from '@api/config/types';
import type { BlogApiError } from '../types';

import blogAPI from '../config';
import { cookieStore } from '@general-infrastructure/stores/cookieStore';

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
				authorization: `Bearer ${cookieStore.get('refresh_token')}`,
			},
		});
	},
});

export const useLogin = ({email, password}: LoginDataType) => {
	return useAppMutation<Response<AuthorizationResponse>, BlogApiError, LoginDataType>(
		() => authorization.login({email, password}),
	);
};

export const useRefreshToken = () => {
	return useAppQuery<Response<RefreshTokenResponse>, BlogApiError>(['refresh_token'], authorization.refresh);
};

export default authorization;