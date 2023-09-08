import { useContext } from 'react';
import { DefferedStoreContext } from './context';

export const useGetDefferedPromise = (name: string) => {
	const store = useContext(DefferedStoreContext);

	return store.getByActionName(name);
};