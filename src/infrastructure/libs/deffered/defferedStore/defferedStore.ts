import { DefferedType } from '../defferedPromise/defferedPromise';

export type DefferedStoreType = {
    // any should be typed
    getByActionName: (actionName: string) => DefferedType<any> | null;
}

class DefferedStore implements DefferedStoreType {
	defferedTasks = new Map<string, DefferedType<any>>();

	getByActionName(actionName: string) {
		return this.defferedTasks.get(actionName) || null;
	}
}

/**
 * Isomorphic getDefferedStore
 */
export const getDefferedStore = () => {
	if(!!(typeof window)) {
		const store = new DefferedStore();
		window._DEFFERED_STORE = store;
	}

	return new DefferedStore();
};