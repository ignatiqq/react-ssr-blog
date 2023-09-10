import { Deffered, DefferedType } from '../defferedPromise/defferedPromise';
import { DefferedClientStoreType, DEFFERED_STORE_CONSTANT_NAME } from './defferedStore';

export class DefferdStoreClient implements DefferedClientStoreType {
	defferedTasks = new Map<string, DefferedType<any>>();

	constructor() {
		this.initWindowStoreVar();
	}

	private initWindowStoreVar() {
		window[DEFFERED_STORE_CONSTANT_NAME] = this;
	}

	private getDeffered(actionName: string) {
		return this.defferedTasks.get(actionName);
	}

	public getByActionName(actionName: string) {
		return this.defferedTasks.get(actionName) || null;
	};

	public setAction(actionName: string) {
		this.defferedTasks.set(actionName, new Deffered());
		return this.getDeffered(actionName);
	}
}