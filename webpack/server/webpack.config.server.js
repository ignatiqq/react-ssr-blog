const nodeExternals = require('webpack-node-externals');
const path = require('path');

const {rules} = require('../shared/rules');
const plugins = require('../shared/plugins');

module.exports = {
	name: 'server',
	entry: {
		server: path.resolve(__dirname, '../../src/server/server.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../../dist/server'),
		publicPath: '/server/',
		filename: 'js/[name].js',
		clean: true,
		assetModuleFilename: 'images/[hash][ext]',
	},
	externals: [nodeExternals()],
	target: 'node',
	node: {
		__dirname: false,
	},
	module: {
		rules: [
			...rules,
			{
				test: /\.s[ac]ss$/i,
				use: [
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [...plugins.server],
};