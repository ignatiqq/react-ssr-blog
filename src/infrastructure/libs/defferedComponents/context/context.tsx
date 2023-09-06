import { Deffered } from '@general-infrastructure/libs/defferedPromise/defferedPromise';
import React, { PropsWithChildren, useRef } from 'react';
import { DefferedStoreType, getDefferedStore } from '../defferedStore/defferedStore';

const initialState: DefferedStoreType = {get: () => new Deffered()};

// we should use context because of we dont want to create global variable on server to keep
// deffered map var with context we can just put it there and keep in 1 session
export const DefferedStoreContext = React.createContext<DefferedStoreType>(initialState);

export const DefferedStoreProvider: React.FC<PropsWithChildren> = ({children}) => {
	const defferedStore = useRef<DefferedStoreType>(getDefferedStore());

	return (
		<DefferedStoreContext.Provider value={defferedStore.current}>
			{children}
		</DefferedStoreContext.Provider>
	);
};