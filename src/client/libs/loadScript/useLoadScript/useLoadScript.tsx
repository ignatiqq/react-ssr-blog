import { useEffect, useState } from 'react';

import { loadScript } from '@client/libs/loadScript/loadScript/loadScript';
import { removeKeyFromObject } from '@client/libs/codeHelpers/filters';

const scriptsCache: {[key: string]: boolean} = {};

const useLoadScript = (url: string): {error: string, isReady: boolean} => {
	const [error, setError] = useState('');
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if(scriptsCache[url]) {
			return;
		}

		const onLoad = () => {
			setIsReady(true);
			setError('');
			scriptsCache[url] = true;
		};

		const onError = () => {
			setIsReady(false);
			setError(`Some error occured while ${url} script loading.`);

			if(scriptsCache[url]) {
				removeKeyFromObject(scriptsCache, url);
			}
		};

		loadScript(url, {
			onLoad,
			onError,
		});
	}, []);

	return {
		error,
		isReady,
	};
};

export default useLoadScript;