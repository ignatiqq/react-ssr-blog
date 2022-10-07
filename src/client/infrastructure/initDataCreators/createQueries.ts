import { QueryKey, QueryFunction } from "@tanstack/react-query";

import createInitialQueryRequest from "./query";

const queryRequestsCreator = (queries: {key: QueryKey, fn: any}[]) => {
    return queries.map(({key, fn}) => {
        return createInitialQueryRequest({key, fn})
    })
}

export {
    queryRequestsCreator,
}