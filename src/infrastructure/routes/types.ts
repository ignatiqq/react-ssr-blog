import { QueryClient } from "@tanstack/react-query";

import createInitialQueryRequest from '../initDataCreators/query';


interface IRouteType {
    path: string;
    component: React.FC;
    getInitialData?: (queryClient: QueryClient, ...args: any[]) => ReturnType<typeof createInitialQueryRequest>;
}

export {
    IRouteType,
}