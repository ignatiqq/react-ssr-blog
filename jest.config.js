const folderAliases = ['client', 'server'];

function getModuleNameMapperByArray(data) {
	const finalObj = {};

	data.forEach((item) => {
		finalObj[`^@${item}(.*$)`] = `<rootDir>/src/${item}$1`;
	});

	return finalObj;
}

module.exports = {
	preset: 'ts-jest',
	transform: {
		'.(ts|js)$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		...getModuleNameMapperByArray(folderAliases),
	},
};