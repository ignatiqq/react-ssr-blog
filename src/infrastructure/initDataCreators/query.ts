import { QueryClient, QueryKey } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type CreateInitialQueryType<TRes> = {
    key: QueryKey;
    fn: () => Promise<AxiosResponse<TRes>>;
}

function createInitialQueryRequest<TRes>(client: QueryClient, {key, fn}: CreateInitialQueryType<TRes>) {
    return client.prefetchQuery(key, () => fn());
}

export default createInitialQueryRequest;