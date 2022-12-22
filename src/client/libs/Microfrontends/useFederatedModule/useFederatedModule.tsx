import React, { useEffect, useState, LazyExoticComponent, ComponentType } from 'react';

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

const federatedModulesCache: {[key: string]: boolean} = {};

const createFederatedModuleKey = ({url, containerName, module}: {[key: string]: string}) => {
	return [url,containerName,module].join('-');
};

const useFederatedModule = <Props, >({
	url,
	containerName,
	module,
}: IFederatedComponentHook) => {
	const [Component, setComponent] = useState<React.FC<Props> | null>(null);
	const {error, isReady} = useLoadScript(url);

	useEffect(() => {
		if(!isReady || !error) return;

		const component = requestForModule(containerName, module);
		setComponent(component);
		const moduleKey = createFederatedModuleKey({url, containerName, module});
		federatedModulesCache[moduleKey] = true;

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