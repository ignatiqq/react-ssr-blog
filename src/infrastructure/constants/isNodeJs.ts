const isNodeJS = (): boolean => {
	return !!typeof global && typeof window === 'undefined';
};

export default isNodeJS;