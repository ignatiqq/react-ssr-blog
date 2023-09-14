import { SerializerType } from '@general-infrastructure/libs/serializer/type';
import { Deffered, DefferedType } from '../defferedPromise/defferedPromise';
import { ScriptResolverType } from '../scriptResolver/scriptResolver';
import { DefferedServerStoreType, DEFFERED_STORE_CONSTANT_NAME } from './defferedStore';
import { createDefferedScript, createResolvedDefferedScript } from './utils';

export class DefferedStoreServer implements DefferedServerStoreType {
	defferedTasks = new Map<string, DefferedType<any>>();

	constructor(readonly serializer: SerializerType, readonly scriptResolver: ScriptResolverType) {}

	private isDefferedPresents(actonName: string) {
		return !!this.getDeffered(actonName);
	}

	private getDeffered(actionName: string) {
		return this.defferedTasks.get(actionName);
	}

	public setAction(actionName: string) {
		this.defferedTasks.set(actionName, new Deffered());
		return this.getDeffered(actionName);
	}

	public getByActionName(actionName: string) {
		return this.defferedTasks.get(actionName) || null;
	}

	public createActionData<T extends object>(actionName: string, getData: () => Promise<T>) {
		getData()
			.then((data) => {
				if(!this.isDefferedPresents(actionName)) return;

				const script = createResolvedDefferedScript(actionName, this.serializer.serializeObject(data));

				this.scriptResolver.resolveScript(script);
			})
			.catch((err: Error) => {
				if(!this.isDefferedPresents(actionName)) return;

				const deffered = this.getDeffered(actionName);

				deffered.reject(this.serializer.serializeObject(err));
			});
	}
}
