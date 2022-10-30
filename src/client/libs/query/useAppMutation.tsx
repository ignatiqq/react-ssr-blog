import { MutationFunction, useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';

const useAppMutation = <TData, TError, TVars>(
	mutationFn: MutationFunction<TData, TVars>,
	options?: Omit<UseMutationOptions<TData, TError, TVars>, 'mutationFn'>,
): UseMutationResult<TData, TError ,TVars> => {
	return useMutation(mutationFn, options);
};

export default useAppMutation;