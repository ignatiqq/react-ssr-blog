const nodeExternals = require('webpack-node-externals');
const path = require('path');
const {webpackAliases} = require('./config/aliases.js');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isDev = mode === 'development';

module.exports = {
	name: 'server',
	entry: {
		server: path.resolve(__dirname, 'src/server/server.ts'),
	},
	mode: mode,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx'],
		alias: webpackAliases,
	},
	devtool: isDev ? 'inline-source-map' : 'source-map',
	externals: [nodeExternals()],
	target: 'node',
	node: {
		__dirname: false,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.server.json',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new Dotenv(),
	],
};