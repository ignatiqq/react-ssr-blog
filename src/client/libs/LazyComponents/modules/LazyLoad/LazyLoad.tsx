import React, {ReactNode, ComponentType, LazyExoticComponent, Suspense, useState, lazy} from 'react';

import {loadWithRetry} from '@client/libs/LazyComponents/utils/';
import {dynamicImportReturn} from '@client/libs/LazyComponents/types';

export interface ILazyLoad<T> {
	load: () => dynamicImportReturn;
    render: (arg: React.LazyExoticComponent<React.ComponentType<T>>) => React.ReactNode,
    fallback?: ReactNode;
	options?: {
		mustRetry: boolean;
		attempts: number;
		onError?: (message?: string) => void;
	}
}

const LazyLoad = <T,>({
	load,
	render,
	fallback,
	options = {mustRetry: true, attempts: 3, onError: console.error},
}: ILazyLoad<T>) => {
	const {onError, mustRetry, attempts} = options;

	const importCallback = React.useRef(
		mustRetry ? () =>
			loadWithRetry(load, {
				...(onError ? {errorCallback: onError} : {}),
				...(attempts ? {retries: attempts} : {retries: 3}),
			}) :
			() => import(`${load}`),
	);

	const [Component] = useState<LazyExoticComponent<ComponentType<T>>>(lazy(importCallback.current));

	const suspenseFallback = fallback ? fallback : <div>Loading...</div>;
	return (
		<Suspense fallback={suspenseFallback}>
			{render(Component)}
		</Suspense>
	);
};

export default LazyLoad;
