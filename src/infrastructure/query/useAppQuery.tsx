import React from "react";
import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

const useAppQuery = <TResponse, TError>(key: QueryKey, queryFn: QueryFunction, options: UseQueryOptions) => {
    return useQuery(key, queryFn, {...options});
}

export default useAppQuery;