export const removeKeyFromObject = (obj: {[key: string]: any}, key: string) => {
	Object.keys(obj).filter(keyVal => keyVal !== key).reduce((acc,key) => {
		return acc[key] = obj[key];
	}, {} as {[key: string]: any});
};