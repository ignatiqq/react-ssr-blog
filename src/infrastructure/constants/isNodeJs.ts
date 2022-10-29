const isNodeJS = (): boolean => {
	return !!typeof global;
};

export default isNodeJS;