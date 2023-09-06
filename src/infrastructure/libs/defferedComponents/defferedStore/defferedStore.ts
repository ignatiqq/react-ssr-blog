import { DefferedType } from '@general-infrastructure/libs/defferedPromise/defferedPromise';

export type DefferedStoreType = {
    // any should be typed
    get: (actionName: string) => DefferedType<any>;
}

export const getDefferedStore = () => {
	return !!(typeof window) ? window._DEFFERED_STORE : new Map();
};