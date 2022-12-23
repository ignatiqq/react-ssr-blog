const nodeExternals = require('webpack-node-externals');
const path = require('path');
const {webpackAliases} = require('./config/aliases.js');
const Dotenv = require('dotenv-webpack');

const {sharedPlugins} = require('./config/plugins');

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
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'css-loader',
					'sass-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.svg$/,
			 	loader: 'svg-inline-loader',
				 exclude: /node_modules/,
			},
			{
				test: /\.png/,
				type: 'asset',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		...sharedPlugins,
		new Dotenv(),
	],
};