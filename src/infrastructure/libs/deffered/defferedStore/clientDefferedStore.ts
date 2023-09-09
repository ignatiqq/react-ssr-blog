import { DefferedType } from '../defferedPromise/defferedPromise';
import { DefferedClientStoreType } from './defferedStore';

export class DefferdStoreClient implements DefferedClientStoreType {
	defferedTasks = new Map<string, DefferedType<any>>();

	public getByActionName(actionName: string) {
		return this.defferedTasks.get(actionName) || null;
	};
}