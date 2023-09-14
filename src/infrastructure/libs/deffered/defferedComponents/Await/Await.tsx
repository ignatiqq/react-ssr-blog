import React, { PropsWithChildren } from 'react';
import { useGetDeferredStore } from '../context/useGetDefferedStore';

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
	const store = useGetDeferredStore();
	const deffered = store.getByActionName(name);

	// @TODO add client use cases

	if(!deffered) {
		store.setAction(name);
		
		if(Boolean(typeof window)) {
			getData().then(deffered.resolve);
			// avoid errors at the client
			store.getByActionName(name).reject = function() {}
		}
	}

	// почему то на клиенте он фалс в виндоу
	// может нужно передавать все таки ресолв флага в тру
	// может быть это пофиксит гидрацию интерактив ошибку
	console.log({deffered}, deffered.isResolvedPromise);

	// indicates server store env
	// request for data on server
	if(typeof window === 'undefined' && 'createActionData' in store) {
		store.createActionData(name, getData);
	}

	if(deffered.isResolved()) {
		return <>{children(deffered.promise)}</>;
	}

	// react suspense feature
	throw deffered.promise;
};