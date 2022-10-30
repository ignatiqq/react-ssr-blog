import React from 'react';
import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

export type QueryOptionsType<TResponse, TError> = Omit<UseQueryOptions<TResponse, TError>, 'queryKey' | 'queryFn'>

const useAppQuery = <TResponse, TError>(
	key: QueryKey,
	queryFn: QueryFunction<TResponse>,
	options: QueryOptionsType<TResponse, TError> = {},
) => {
	return useQuery<TResponse, TError>(key, queryFn, {...options});
};

export default useAppQuery;