import React, { memo, Suspense } from 'react';

import useFederatedModule from '@client/libs/Microfrontends/useFederatedModule/useFederatedModule';

interface IDynamicModuleLoader<ModuleProps> {
    url: string;
    containerName: string;
    module: string;
    props?: ModuleProps | {};
}

export type FederatedComponent<ModuleProps> = React.FC<ModuleProps>;

const DynamicModuleLoader = <ModuleProps,>({
	url,
	containerName,
	module,
	props = {},
}: IDynamicModuleLoader<ModuleProps>) => {
	const {Component, error, isLoading} = useFederatedModule({url, containerName, module});

	if (isLoading) {
		return <div>Loading module...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div id={`Microfront container: ${containerName}, name: ${module}`}>
			<Suspense fallback="Component module loading...">
				<Component {...props} />
			</Suspense>
		</div>
	);
};

export default memo(DynamicModuleLoader);


// LEGACY::

// const [isLoading, setIsLoading] = useState(true);
// const [error, setError] = useState('');

// const renderFnRef = React.useRef<FederatedComponent<ModuleProps> | null>();

// useEffect(() => {
// 	const loadModuleFn = async function () {
// 		try {
// 			const Component = requestForModule<ModuleProps>(containerName, module);

// 		} catch (error) {
// 			setError((error as Error).message);
// 			renderFnRef.current = null;
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	loadScript(url, {
// 		onLoad: () => {
// 			loadModuleFn();
// 		},
// 		onError: () => {
// 			setError(`Some error occured while ${containerName} MFE loading`);
// 		},
// 	});
// }, []);