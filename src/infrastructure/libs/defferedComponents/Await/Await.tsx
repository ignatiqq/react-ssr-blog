import React, { PropsWithChildren } from 'react';
import { useGetDefferedPromise } from '../context/useGetDefferedStore';

type PropsType = {
    name: string;
	// should be typed
	children: (deffered: Promise<any>) => React.ReactNode;
}

/**
 * Await component which requests defferedMap action by name
 */
export const Await: React.FC<PropsWithChildren<PropsType>> = ({name, children}) => {
	const deffered = useGetDefferedPromise(name);

	if(deffered.isResolved()) {
		return <>{children(deffered.promise)}</>;
	}

	// react suspense feature
	throw deffered.promise;
};