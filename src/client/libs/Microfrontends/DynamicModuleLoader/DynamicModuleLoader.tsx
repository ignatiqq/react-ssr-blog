import React, { memo, ReactElement, ReactNode, RefObject, useEffect, useState, LazyExoticComponent, ComponentType } from 'react';

import loadModule from '@client/libs/Microfrontends/loadModule';
import {loadScript} from '@client/libs/loadScript/loadScript/loadScript';

interface IDynamicModuleLoader<ModuleProps> {
    url: string;
    containerName: string;
    module: string;
    props?: ModuleProps;
}

export type FederatedComponent<ModuleProps> = React.FC<ModuleProps>;

const requestForModule = <Props,>(containerName: string, module: string): LazyExoticComponent<ComponentType<Props>> => {
	try {
		return React.lazy(loadModule<Props>(containerName, module));
	} catch (error) {
		throw Error(error);
	}
};

const ModulesCache;

const DynamicModuleLoader = <ModuleProps,>({
	url,
	containerName,
	module,
	props,
}: IDynamicModuleLoader<ModuleProps>) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	const renderFnRef = React.useRef<FederatedComponent<ModuleProps> | null>();

	useEffect(() => {
		const loadModuleFn = async function () {
			try {
				const Component = requestForModule<ModuleProps>(containerName, module);

            } catch (error) {
				setError((error as Error).message);
				renderFnRef.current = null;
			} finally {
				setIsLoading(false);
			}
		};

		loadScript(url, {
			onLoad: () => {
				loadModuleFn();
			},
			onError: () => {
				setError(`Some error occured while ${containerName} MFE loading`);
			},
		});
	}, []);

	if (isLoading && !renderFnRef.current) {
		return <div>Loading module...</div>;
	}

	if (error) {
		return <div>Some error occured while component loading: {error}</div>;
	}

	console.log(renderFnRef.current);

	return (
		<div id={`Microfront container: ${containerName}, name: ${module}`}>
			{renderFnRef.current && renderFnRef.current(props)}
		</div>
	);
};

export default memo(DynamicModuleLoader);