export const sleep = (timeout: number = 500): Promise<void> => {
	return new Promise((res) => {
		setTimeout(() => {
			res();
		}, timeout);
	});

};