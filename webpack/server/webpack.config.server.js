const nodeExternals = require('webpack-node-externals');
const path = require('path');
const {mode} = require('../webpack.shared.config');

const {rules} = require('../shared/rules');
const plugins = require('../shared/plugins');

module.exports = {
	name: 'server',
	entry: {
		server: path.resolve(__dirname, '../../src/server/server.ts'),
	},
	stats: {
		colors: true,
	},
	mode: mode,
	output: {
		path: path.resolve(__dirname, '../../dist/server'),
		publicPath: '/static/',
		filename: 'js/[name].js',
		clean: true,
		assetModuleFilename: 'images/[hash][ext]',
		libraryTarget: 'commonjs-module',
	},
	externals: [nodeExternals(), {react: 'react'}],
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