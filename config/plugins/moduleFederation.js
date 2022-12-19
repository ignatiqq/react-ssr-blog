const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const dependencies = require('../../package.json').dependencies;

const shared = {
	react: {
		eager: true,
		singleton: true,
		requiredVersion: dependencies['react'],
	},
	'react-dom': {
		eager: true,
		singleton: true,
		requiredVersion: dependencies['react-dom'],
	},
	'react-router-dom': {
		eager: true,
		singleton: true,
		requiredVersion: dependencies['react-router-dom'],
	},
	axios: {
		eager: true,
		singleton: true,
		requiredVersion: dependencies['axios'],
	},
	'@tanstack/react-query': {
		eager: true,
		singleton: true,
		requiredVersion: dependencies['@tanstack/react-query'],
	},
};

module.exports = {
	client: new ModuleFederationPlugin({
		name: 'shellApp',
		library: { type: 'var' },
		filename: 'shellContainer.js',
		// remotes: {}
		shared,
	}),
	server: new ModuleFederationPlugin({
		name: 'shellApp',
		filename: 'shellEntry.js',
		// remotes: {}
		shared,
	}),
};