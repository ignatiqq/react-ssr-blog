import React, { useEffect, useState, LazyExoticComponent, ComponentType, useRef } from 'react';

import useLoadScript from '@client/libs/loadScript/useLoadScript/useLoadScript';
import { removeKeyFromObject } from '@client/libs/codeHelpers/filters';
import loadModule from '@client/libs/Microfrontends/loadModule';

interface IFederatedComponentHook {
    url: string;
    containerName: string;
    module: string;
}


const requestForModule = <Props,>(containerName: string, module: string): LazyExoticComponent<ComponentType<Props>> => {
	try {
		return React.lazy(loadModule<Props>(containerName, module));
	} catch (error) {
		throw Error(error);
	}
};

const federatedModulesCache: {[key: string]: React.FC<any>} = {};

const createFederatedModuleKey = ({url, containerName, module}: {[key: string]: string}) => {
	return [url,containerName,module].join('-');
};

const useFederatedModule = <Props, >({
	url,
	containerName,
	module,
}: IFederatedComponentHook) => {
	const moduleKeyRef = useRef<string>(createFederatedModuleKey({url, containerName, module}));

	const [Component, setComponent] = useState<React.FC<Props> | null>(federatedModulesCache[moduleKeyRef.current]);
	const {error, isReady} = useLoadScript(url);

	useEffect(() => {
		if(!isReady && !error) return;

		const moduleKey = moduleKeyRef.current;

		if(federatedModulesCache[moduleKey]) {
			setComponent(federatedModulesCache[moduleKey]);
			return;
		}

		const component = requestForModule(containerName, module);
		setComponent(component);
		federatedModulesCache[moduleKey] = component;

		return () => {
			removeKeyFromObject(federatedModulesCache, moduleKey);
		};

 	}, [isReady, error]);

	return {
		error,
		Component,
		isLoading: !error && !Component,
	};
};

export default useFederatedModule;