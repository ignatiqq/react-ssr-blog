import React, { PropsWithChildren } from 'react';
import { useGetDeferredStore, useGetDefferedPromise } from '../context/useGetDefferedStore';

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
	let deffered = useGetDefferedPromise(name);
	const store = useGetDeferredStore();

	if(!deffered) {
		deffered = store.setAction(name);
	}

	// indicates server store env
	// request for data on server
	if('createActionData' in store) {
		store.createActionData(name, getData);
	}

	if(deffered.isResolved()) {
		return <>{children(deffered.promise)}</>;
	}

	// react suspense feature
	throw deffered.promise;
};