import { Deffered, DefferedType } from '../defferedPromise/defferedPromise';
import { DefferedClientStoreType, DEFFERED_STORE_CONSTANT_NAME } from './defferedStore';

export class DefferdStoreClient implements DefferedClientStoreType {

	constructor() {
		this.initWindowStoreVar();
	}

	private initWindowStoreVar() {
		window[DEFFERED_STORE_CONSTANT_NAME] = new Map<string, DefferedType<any>>();
	}

	public getByActionName(actionName: string) {
		return window[DEFFERED_STORE_CONSTANT_NAME].get(actionName);
		// return this.defferedTasks.get(actionName) || null;
	};

	public setAction(actionName: string) {
		window[DEFFERED_STORE_CONSTANT_NAME].set(actionName, new Deffered());
		return this.getByActionName(actionName);
	}
}