import { useContext } from 'react';
import { DefferedStoreContext } from './context';

export const useGetDeferredStore = () => {
	const store = useContext(DefferedStoreContext);

	return store;
};