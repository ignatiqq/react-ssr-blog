const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {rules} = require('../shared/rules');
const {isDev} = require('../webpack.shared.config');
const plugins = require('../shared/plugins');

module.exports = {
	name: 'client',
	target: 'web',
	entry: {
		client: path.resolve(__dirname, '../../src/client/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../../dist/client'),
		filename: 'js/[name].[contenthash].js',
		publicPath: '/static/',
		clean: true,
		assetModuleFilename: 'images/[hash][ext]',
	},
	optimization: {
		moduleIds: 'deterministic',
		minimize: !isDev ? true : false,
		minimizer: !isDev ? [new TerserPlugin()] : [],
	},
	module: {
		rules: [
			...rules,
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		...plugins.client,
	],
};