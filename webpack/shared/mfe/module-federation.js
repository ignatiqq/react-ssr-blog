const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {NodeFederationPlugin} = require('@module-federation/node');

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
	client: {
		homePage: 'homePage@http://localhost:8080/homePageRemote.js',
	},
	server: {
		homePage: 'homePage@http://localhost:8080/homePageRemoteServer.js',
	},
};

module.exports = {
	client: new ModuleFederationPlugin({
		name: 'shellApp',
		remotes: {...remotes.client},
		shared,
	}),
	server: new NodeFederationPlugin({
		name: 'shellAppServer',
		library: {type: 'commonjs-module'},
		remotes: {...remotes.server},
		shared,
	}),
};