const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {rules} = require('../shared/rules');
const {isDev} = require('../webpack.shared.config');
const plugins = require('../shared/plugins');

module.exports = {
	name: 'client',
	entry: {
		client: path.resolve(__dirname, '../../src/client/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../../dist/client'),
		filename: 'js/[name].[contenthash].js',
		publicPath: 'http://localhost:3000/static/',
		chunkFilename: 'chunks/react.[name].chunk.js',
		clean: true,
		assetModuleFilename: 'images/[hash][ext]',
	},
	optimization: {
		moduleIds: 'deterministic',
		minimize: !isDev ? true : false,
		minimizer: !isDev ? [new TerserPlugin()] : [],
		splitChunks: {
			cacheGroups: {
				reactVendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-is)[\\/]/,
					name: 'vendors/react-libs',
					chunks: 'all',
				},
				clientVendors: {
					// вебпак не возьмет express и ejs в бандл так как у него в дереве нет зависимости на них
					test: /[\/]node_modules[\/]((?!(react|react-dom|react-router|react-is|react-router-dom)).*)[\/]/,
					name: 'vendors/vendors-without-react-libs',
					chunks: 'all',
				},
			},
		},
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
