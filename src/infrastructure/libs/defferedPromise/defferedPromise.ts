import { noop } from '@general-infrastructure/constants/functions';
import { rejects } from 'assert';

type DefferedType<PromiseDataType> = {
    resolve: (data?: PromiseDataType) => void;
    reject: (reason: any) => void;
    isResolved: () => boolean;
    isRejected: () => boolean;
    isResolvedPromise: boolean;
    isRejectedPromise: boolean;
    promise: Promise<PromiseDataType> | null;
}

export class Deffered<PromiseDataType> implements DefferedType<PromiseDataType> {
	isResolvedPromise: boolean;
	isRejectedPromise: boolean;
	promise: Promise<PromiseDataType>;
	resolve: (data?: PromiseDataType) => void;
	reject: (reason?: any) => void;

	constructor() {
		this.promise = new Promise((res, rej) => {
			this.resolve = (data) => {
				this.isRejectedPromise = true;
				res(data);
			};

			this.reject = (reason) => {
				this.isResolvedPromise = true;
				rejects(reason);
			};
		});
	}

	isResolved() {
		return this.isRejectedPromise;
	}

	isRejected() {
		return this.isRejectedPromise;
	}

}