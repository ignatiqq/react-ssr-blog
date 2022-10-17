const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {webpackAliases} = require('../shared/aliases.js');


const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isDev = mode === 'development';

module.exports = {
	name: 'client',
	entry: {
		client: path.resolve(__dirname, '../../src/client/index.tsx'),
	},
	output: {
		path: path.resolve(__dirname, '../../dist/static'),
		publicPath: path.resolve(__dirname, '/static'),
		chunkFilename: 'react.[name].chunk.js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
		alias: webpackAliases,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env', '@babe/react'],
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.ts(x?)$/,
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.client.json',
				},
				exclude: /node_modules/,
			},
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
	optimization: {
		splitChunks: {
			cacheGroups: {
				reactVendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
					name: 'react-libs',
					chunks: 'all',
				},
				clientVendors: {
					// вебпак не возьмет express и ejs в бандл так как у него в дереве нет зависимости на них
					test: /[\/]node_modules[\/]((?!(react|react-dom|react-router-dom)).*)[\/]/,
					name: 'vendors-without-react-libs',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		new BundleAnalyzerPlugin({
			generateStatsFile: isDev ? true: false,
		}),
	],
};