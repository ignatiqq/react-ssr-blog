import { Deffered } from '../../defferedPromise/defferedPromise';
import React, { PropsWithChildren, useRef } from 'react';
import { IsomorphicDefferedStoreType } from '../../defferedStore/defferedStore';

const initialState: IsomorphicDefferedStoreType = {getByActionName: () => new Deffered()};

// we should use context because of we dont want to create global variable on server to keep
// deffered map var with context we can just put it there and keep in 1 session
export const DefferedStoreContext = React.createContext<IsomorphicDefferedStoreType>(initialState);

type PropsType = {
    // контекст ничего не знает о реализации дефферд стор, только о типе
    defferedStore: IsomorphicDefferedStoreType;
}

export const DefferedStoreProvider: React.FC<PropsWithChildren<PropsType>> = ({
	children,
	defferedStore: defferedStoreImpl,
}) => {
	const defferedStore = useRef<IsomorphicDefferedStoreType>(defferedStoreImpl);

	return (
		<DefferedStoreContext.Provider value={defferedStore.current}>
			{children}
		</DefferedStoreContext.Provider>
	);
};