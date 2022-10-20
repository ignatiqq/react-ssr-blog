// fallback if has add suspense tag with fallback
// children = component
// retry ? посмотреть у чела на гите
// <LazyLoad fallback={jsx | string = React.node}></LazyLoad>

import type {ReactNode} from 'react';
import {useRef, useState, lazy} from 'react';

type FallbackCallbackStatus = 'rejected' | 'success' | 'pending';
const REJECTED = 'rejected',
	SUCCESS = 'success',
	PENDING = 'pending';

type LazyRetry = {
    retries: boolean;
    attempts: number;
}
type LoadFunction = (status: string, arg: () => string) => void
type ReducerCallback = (status: string) => void;

interface ILazyLoad {
    load: string;
    render: (arg?: ReactNode) => ReactNode;
    fallback: (status: FallbackCallbackStatus) => ReactNode | ReactNode;
    retry?: LazyRetry;
    onError?: (message?: string) => void;
}

function statusReducer(status: FallbackCallbackStatus, cb: ReducerCallback) {
	switch(status) {
	case SUCCESS: {
		cb(SUCCESS);
	}
		break;
	case REJECTED: {
		cb(REJECTED);
	}
		break;
	default: {
		cb(PENDING);
	}
		break;
	}
}


const LazyLoad: React.FC<ILazyLoad> = ({
	load,
	render,
	fallback,
	retry,
	onError,
}) => {
	const callback = useRef(loadWithRetryCreator(load, {
		errorCallback: (message: string) => {
			if(onError) onError(message);
			console.error(message);
		},
	}));

	const [component, setComponent] = useState<any>(lazy(callback.current));



    return (

    )

	// useLayoutEffect(() => {
	// 	if(typeof fallback === 'function') {
	// 		callback.current = fallback;
	// 	}
	// 	// else {
	// 	// 	callback.current = statusReducer;
	// 	// }
	// 	loadWithRetry({load, callback});
	// }, []);




	// if(fallback) {
	//     return (

	//     )
	// }

};

// LOAD WITH RETRY MODULE
type loadWithRetryCreatorResult = (retriesCount: number, loadRetriesCount: number) => Promise<>;
type loadWithRetryCreatorOptions = {
    errorCallback: (message: string) => void;
    retries?: number;
    timeoutMs?: number;
}
// loadWithRetryCreator function which load module by name with any retries count.
// It chould call callback with status and module(jsx | error | pending);
function loadWithRetryCreator(load: string,
	{
		errorCallback,
		retries = 3,
		timeoutMs = 2000,
	}: loadWithRetryCreatorOptions): loadWithRetryCreatorResult {
	return function loadFunction(retriesCount = retries, loadRetriesCount = 2) {
		return new Promise((resolve, reject) => {
			import(/* webpackChunkName: 'LazyLoadChunk' */ `${load}`)
				.then(resolve)
				.catch((error) => {
					errorCallback(error.message);

					if(retriesCount > 0) {
						setTimeout(() => {
							loadFunction(retriesCount - 1, loadRetriesCount * 2);
						}, loadRetriesCount * timeoutMs);
					} else {
						reject(error);
					}
				});
		});
	};
}

// function loadWithRetry({load, callback, retries = 3, timeoutMs = 2000}: LoadWithRetryArgs) {
// 	const originalCountRetries = retries;
// 	let isSuccess = false;
// 	(function retry() {
// 		while(retries-- > 0) {
// 			if(originalCountRetries === retries) {
// 				callback(PENDING, null);
// 			}
// 			import(/* webpackChunkName: 'LazyLoadChunk' */ `${load}`)
// 				.then((module) => {
// 					isSuccess = true;
// 					callback(SUCCESS, module);
// 				})
// 				.catch((error) => callback(REJECTED, error.message))
// 				.finally(() => {
// 					if(!isSuccess) {
// 						setTimeout(() => {
// 							retry();
// 						}, timeoutMs = timeoutMs * retries);
// 					}
// 				});
// 		}
// 	})();
// }