import { Deffered, DefferedType } from '@general-infrastructure/libs/defferedPromise/defferedPromise';

export type DefferedStoreType = {
    // any should be typed
    get: (actionName: string) => DefferedType<any>;
}

const createClientDefferedStore = (): DefferedStoreType => {
	return {get: () => new Deffered()};
};

export const getDefferedStore = () => {
	if(!!(typeof window)) {
		const store = createClientDefferedStore();
		window._DEFFERED_STORE = store;
	}

	return new Map();
};