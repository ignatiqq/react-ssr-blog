import { QueryClient } from '@tanstack/react-query';

export type getInitialQueryData = (
    queryClient: QueryClient, ...args: any[]
) => ReturnType<typeof queryClient.prefetchQuery>;

interface IRouteType {
    path: string;
    title: string;
    initialData?: {
        getInitialQueryData?: Array<getInitialQueryData>;
        getInitialStoreData?: Array<(store: any) => void>;
    }
}

export {
	IRouteType,
};