import axios, { AxiosResponse } from 'axios';

import { IRequestArgs, IRequestConfig, requestMethods } from './types';

let client: any = axios;

const setClient = <T>(fn: T): void => {
	client = fn;
};

function makeRequest<T>({ url, method, body, ...config }: IRequestArgs<T>): Promise<AxiosResponse> {
	return client({
		url: url,
		method,
		data: body,
		...config,
	});
}

export const requests = Object.freeze({
	post<T>(url: string, body: T, config?: IRequestConfig) {
		return makeRequest({ url, method: requestMethods.POST, body, ...config });
	},
	get(url: string, config?: IRequestConfig) {
		return makeRequest({ url, method: requestMethods.GET, ...config });
	},
	put<T>(url: string, body: T, config?: IRequestConfig) {
		return makeRequest({ url, method: requestMethods.PUT, body, ...config });
	},
});

const makeApi = (baseUrl: string, headers: { [key: string]: string } = {}) => {
	return {
		get(endpoint: string, config?: IRequestConfig) {
			return requests.get(`${baseUrl}${endpoint}`, { ...config, ...headers });
		},
		post<T>(endpoint: string, body: T, config?: IRequestConfig) {
			return requests.post(`${baseUrl}${endpoint}`, body, { ...config, headers });
		},
	};
};

export {
	makeApi,
	setClient,
};