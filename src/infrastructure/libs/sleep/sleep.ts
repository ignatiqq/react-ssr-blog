export const sleep = (timeout: number = 500, resolve?: any): Promise<void> => {
	return new Promise((res) => {
		setTimeout(() => {
			res();
		}, timeout);
	});

};