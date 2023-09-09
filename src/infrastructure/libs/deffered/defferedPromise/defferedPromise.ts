export type DefferedType<PromiseDataType> = {
    resolve: (data?: PromiseDataType) => void;
    reject: (reason: any) => void;
    isResolved: () => boolean;
    isRejected: () => boolean;
	isPending: () => boolean;
    isResolvedPromise: boolean;
    isRejectedPromise: boolean;
	isPendingPromise: boolean;
    promise: Promise<PromiseDataType> | null;
}

// Realization
export class Deffered<PromiseDataType> implements DefferedType<PromiseDataType> {
	isResolvedPromise: boolean;
	isRejectedPromise: boolean;
	isPendingPromise: boolean;
	promise: Promise<PromiseDataType>;
	resolve: (data?: PromiseDataType) => void;
	reject: (reason?: any) => void;

	constructor() {
		this.promise = new Promise((res, rej) => {
			this.isPendingPromise = true;

			this.resolve = (data) => {
				this.isRejectedPromise = true;
				res(data);
				this.isPendingPromise = false;
			};

			this.reject = (reason) => {
				this.isResolvedPromise = true;
				rej(reason);
				this.isPendingPromise = false;
			};
		});
	}

	isResolved() {
		return this.isRejectedPromise;
	}

	isRejected() {
		return this.isRejectedPromise;
	}

	isPending() {
		return this.isPendingPromise;
	}
}