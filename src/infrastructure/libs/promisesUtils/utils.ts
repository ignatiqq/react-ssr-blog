type ControlledPromiseType = {
    promise: Promise<any>;
    resolve: (value?: unknown) => void;
    reject: (value?: unknown) => void;
}

export function createControlledPromise(): ControlledPromiseType {
	let resolve;
	let reject;
	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return {promise, resolve, reject};
}