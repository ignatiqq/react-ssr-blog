import React, { useRef } from 'react';
import type {ReactNode, ComponentType, LazyExoticComponent} from 'react';
import {Suspense, useState, lazy} from 'react';

type dynamicImportReturn = Promise<{ default: ComponentType<any>; }>;
type loadWithRetryOptions = {
    errorCallback?: (message: string) => void;
    retries: number;
    timeoutMs?: number;
}

interface ILazyLoad<T> {
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

	const importCallback = useRef(
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

// LOAD WITH RETRY MODULE

// loadWithRetry function which load module by name with any retries count.
// It chould call callback with status and module(jsx | error | pending);
function loadWithRetry(
	load: () => dynamicImportReturn,
	{
		errorCallback = console.error,
		retries,
		timeoutMs = 2000,
	}: loadWithRetryOptions): dynamicImportReturn{
	return new Promise((resolve, reject) => {
		(function retry(retriesCount: number, loadRetriesCount: number) {
			load()
				.then(resolve)
				.catch(error => {
					errorCallback(error.message);

					if(retriesCount) {
						setTimeout(() => {
							retry(retriesCount - 1, loadRetriesCount * 2);
						}, loadRetriesCount * timeoutMs);
					} else {
						reject(error);
					}
				});
		})(retries, 2);
	});
}

// LEGACY

// }
// loadWithRetry function which load module by name with any retries count.
// It chould call callback with status and module(jsx | error | pending);
// function loadWithRetryCreator(load: string,
// 	{
// 		errorCallback,
// 		retries = 3,
// 		timeoutMs = 2000,
// 	}: loadWithRetryCreatorOptions): loadWithRetryCreatorResult {
// 	return function loadFunction(retriesCount = retries, loadRetriesCount = 2) {
// 		return new Promise((resolve, reject) => {
// 			import(/* webpackChunkName: 'LazyLoadChunk' */ `${load}`)
// 				.then(resolve)
// 				.catch((error) => {
// 					errorCallback(error.message);

// 					if(retriesCount > 0) {
// 						setTimeout(() => {
// 							loadFunction(retriesCount - 1, loadRetriesCount * 2).then(resolve).catch(reject);
// 						}, loadRetriesCount * timeoutMs);
// 					} else {
// 						reject(error);
// 					}
// 				});
// 		});
// 	};
// }

// const callback = useRef(loadWithRetryCreator(load, {
// 	errorCallback: (message: string) => {
// 		if(onError) onError(message);
// 		console.error(message);
// 	},
// }));