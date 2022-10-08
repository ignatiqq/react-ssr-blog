import React from 'react';
import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

const useAppQuery = <TResponse, TError>(
	key: QueryKey, queryFn: QueryFunction<TResponse>,
	options?: Omit<UseQueryOptions<TResponse, TError>, 'queryKey' | 'queryFn'>,
) => {
	return useQuery<TResponse, TError>(key, queryFn, {...options});
};

export default useAppQuery;