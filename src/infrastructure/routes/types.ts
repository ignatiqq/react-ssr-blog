import { QueryClient } from '@tanstack/react-query';

export type getInitialQueryData = (queryClient: QueryClient, ...args: any[]) => ReturnType<typeof queryClient.prefetchQuery>;

interface IRouteType {
    path: string;
    component: React.FC;
    initialData?: {
        getInitialQueryData?: Array<getInitialQueryData>;
        getInitialStoreData?: Array<(store: any) => void>;
    }
}

export {
	IRouteType,
};