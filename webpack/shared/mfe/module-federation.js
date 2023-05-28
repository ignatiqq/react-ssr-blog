const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {NodeFederationPlugin, StreamingTargetPlugin} = require('@module-federation/node');

const path = require('path');

const dependencies = require(path.join(__dirname, '../../../package.json')).dependencies;

const shared = {
	react: {
		requiredVersion: dependencies['react'],
	},
	'react-dom': {
		requiredVersion: dependencies['react-dom'],
	},
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
			filename: 'container.js',
			remotes: {...remotes.client},
			exposes: {},
			shared,
		}),
	],
	server: [
		new NodeFederationPlugin({
			name: 'shellApp',
			filename: 'container.js',
			library: {type: 'commonjs-module'},
			remotes: {...remotes.server},
			shared: [{ 'react': dependencies.react, 'react-dom': dependencies['react-dom'] }],
		}),
		new StreamingTargetPlugin({
			name: 'shellApp',
			library: { type: 'commonjs-module' },
			remotes: {...remotes.server},
		}),
	],
};