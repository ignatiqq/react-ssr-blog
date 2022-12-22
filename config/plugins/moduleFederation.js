const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const dependencies = require('../../package.json').dependencies;

const shared = {
	react: {
		singleton: true,
		requiredVersion: dependencies['react'],
	},
	'react-dom': {
		singleton: true,
		requiredVersion: dependencies['react-dom'],
	},
	'react-router-dom': {
		singleton: true,
		requiredVersion: dependencies['react-router-dom'],
	},
	axios: {
		singleton: true,
		requiredVersion: dependencies['axios'],
	},
	'@tanstack/react-query': {
		singleton: true,
		requiredVersion: dependencies['@tanstack/react-query'],
	},
};

const remotes = {
	homePage: 'homePage@http://localhost:8080/homePageRemote.js',
};

module.exports = {
	client: new ModuleFederationPlugin({
		name: 'shellApp',
		remotes: {...remotes},
		shared,
	}),
	server: new ModuleFederationPlugin({
		name: 'shellApp',
		remotes: {...remotes},
		shared,
	}),
};