import {dynamicImportReturn} from '@client/libs/LazyComponents/types';

type loadWithRetryOptions = {
    errorCallback?: (message: string) => void;
    retries: number;
    timeoutMs?: number;
}

/**
 * loadWithRetry - function which try to load dynamic import module any times
 * @param {dynamicImportReturn} load callback wich calls dynamic import () => import('path')
 * @returns {dynamicImportReturn} returns Promise<{default: React Component}> which will used in code
 */
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

export default loadWithRetry;