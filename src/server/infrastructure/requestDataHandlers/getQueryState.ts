import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getInitialQueryData } from '@general-infrastructure/routes/types';

// @TODO ADD ARGUMENTS TO QUERY FN'S
const getReactQueryState = async (
	queryClient: QueryClient,
	requests: getInitialQueryData[],
): Promise<ReturnType<typeof dehydrate>> => {
	return new Promise((res, rej) => {
		const queries: Promise<void>[] = [];

		requests.forEach((cb) => {
			queries.push(cb(queryClient as any));
		});

		Promise.allSettled(queries).then(() => {
			res(dehydrate(queryClient));
		});
	});
};

export {getReactQueryState};