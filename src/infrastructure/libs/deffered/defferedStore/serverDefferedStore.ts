import { SerializerType } from '@general-infrastructure/libs/serializer/type';
import { DefferedType } from '../defferedPromise/defferedPromise';
import { DefferedServerStoreType, DEFFERED_STORE_CONSTANT_NAME } from './defferedStore';

export type ScriptResolverType = (script: string) => void;


export class DefferedStoreServer implements DefferedServerStoreType {
	defferedTasks = new Map<string, DefferedType<any>>();

	constructor(readonly serializer: SerializerType, readonly scriptResolver: ScriptResolverType) {}

	private isDefferedPresents(actonName: string) {
		return !!this.getDeffered(actonName);
	}

	private getDeffered(actionName: string) {
		return this.defferedTasks.get(actionName);
	}

	public getByActionName(actionName: string) {
		return this.defferedTasks.get(actionName) || null;
	}

	private createResolveScript(actionName: string, data: string) {
		return `<script>
			window[${DEFFERED_STORE_CONSTANT_NAME}][${actionName}]
				.resolve(${data})
		`;
	}

	public createActionData<T extends object>(actionName: string, getData: () => Promise<T>) {
		getData()
			.then((data) => {
				if(!this.isDefferedPresents(actionName)) return;

				const deffered = this.getDeffered(actionName);

				const script = this.createResolveScript(actionName, this.serializer.serializeObject(data));

				this.scriptResolver(script);
			})
			.catch((err: Error) => {
				if(!this.isDefferedPresents(actionName)) return;

				const deffered = this.getDeffered(actionName);

				deffered.reject(this.serializer.serializeObject(err));
			});
	}
}
