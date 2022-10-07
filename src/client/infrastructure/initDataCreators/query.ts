import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

type CreateInitialQueryType<TRes> = {
    key: QueryKey;
    fn: (...args: any[]) => QueryFunction<TRes>;
}

function createInitialQueryRequest<TRes>({key, fn}: CreateInitialQueryType<TRes>) {
    return function(client: QueryClient, ...args) {
        return client.prefetchQuery(key, () => fn(args));
    }
}

export default createInitialQueryRequest;