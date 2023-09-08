import React, { PropsWithChildren } from 'react';
import { useGetDefferedPromise } from '../context/useGetDefferedStore';

type PropsType = {
    name: string;
	// @TODO add request for data
	// call getData and add wait for response promise in maybe class store for this tasks
	// and after promise resolved send serialized promoise response to client
	// do all this things ONLY IF SERVER
	getData: () => Promise<any>
	// should be typed
	children: (deffered: Promise<any>) => React.ReactNode;
}

/**
 * Await component which requests defferedMap action by name
 */
export const Await: React.FC<PropsWithChildren<PropsType>> = ({name, getData, children}) => {
	const deffered = useGetDefferedPromise(name);

	if(deffered.isResolved()) {
		return <>{children(deffered.promise)}</>;
	}

	if(deffered.isRejected()) {
		// handle an error
	}

	// react suspense feature
	throw deffered.promise;
};