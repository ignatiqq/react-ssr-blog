const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {NodeFederationPlugin, StreamingTargetPlugin} = require('@module-federation/node');

const path = require('path');

const dependencies = require(path.join(__dirname, '../../../package.json')).dependencies;

const shared = {
	react: {
		singleton: true,
		requiredVersion: dependencies['react'],
	},
	'react-dom': {
		singleton: true,
		requiredVersion: dependencies['react-dom'],
	},
	// 'react-router-dom': {
	// 	singleton: true,
	// 	requiredVersion: dependencies['react-router-dom'],
	// },
	// axios: {
	// 	singleton: true,
	// 	requiredVersion: dependencies['axios'],
	// },
	// '@tanstack/react-query': {
	// 	singleton: true,
	// 	requiredVersion: dependencies['@tanstack/react-query'],
	// },
};

const remotes = {
	server: {
		homePage: 'homePage@http://localhost:8080/server/homePageRemote.js',
	},
	client: {
		homePage: 'homePage@http://localhost:8080/client/homePageRemote.js',
	},
};

module.exports = {
	client: [
		new ModuleFederationPlugin({
			name: 'shellApp',
			remotes: {...remotes.client},
			shared,
		}),
	],
	server: [
		new NodeFederationPlugin({
			name: 'shellApp',
			library: {type: 'commonjs-module'},
			remotes: {...remotes.server},
		}),
		new StreamingTargetPlugin({
			name: 'shellApp',
			library: { type: 'commonjs-module' },
			remotes: {...remotes.server},
		}),
	],
};