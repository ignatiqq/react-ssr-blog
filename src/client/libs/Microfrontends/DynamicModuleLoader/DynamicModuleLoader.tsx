import React, { ReactElement, RefObject, useEffect, useState } from 'react';

// @ts-ignore
import loadModule from '@client/libs/loadScript';

interface IDynamicModuleLoader<ModuleProps> {
    url?: string;
    containerName: string;
    module: string;
    props?: ModuleProps;
}

type RenderFunction<ModuleProps> = (props?: ModuleProps) => ReactElement;

const DynamicModuleLoader = <ModuleProps,>({
	url,
	containerName,
	module,
	props,
}: IDynamicModuleLoader<ModuleProps>) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	const renderFnRef = React.useRef<RenderFunction<ModuleProps>>(null);

	useEffect(() => {
		(async function () {
			try {
				const component = await loadModule(containerName, module);

				console.log(component);

				if(typeof component !== 'function') {
					throw new TypeError('Typeof loadable module must be function');
				}

				renderFnRef.current = component;
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setError(error.message);
				renderFnRef.current = null;
			}
		})();
	});

	if (isLoading && !renderFnRef.current) {
		return <div>Loading module...</div>;
	}

	if (error) {
		return <div>Some error occured while component loading: {error}</div>;
	}

	return (
		<div id={`Microfront container: ${containerName}, name: ${module}`}>
			{renderFnRef.current(props)}
		</div>
	);
};

export default DynamicModuleLoader;