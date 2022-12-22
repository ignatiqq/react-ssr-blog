import React, { useState } from 'react';

import useLoadScript from '@client/libs/loadScript/useLoadScript/useLoadScript';

interface IFederatedComponentHook {
    url: string;
    containerName: string;
    module: string;
}

const FederatedModulesCache = new Map();

const useFederatedComponent = <Props, >({
	url,
	containerName,
	module,
}: IFederatedComponentHook) => {
	const [Component, setComponent] = useState<React.FC<Props> | null>(null);
	const {error, isReady} = useLoadScript(url);


	return (
		<div>useFederatedComponent</div>
	);
};

export default useFederatedComponent;