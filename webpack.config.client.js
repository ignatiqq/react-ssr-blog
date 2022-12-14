const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { webpackAliases } = require('./config/aliases');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const {sharedPlugins} = require('./config/plugins');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isDev = mode === 'development';

module.exports = {
	name: 'client',
	entry: {
		client: path.resolve(__dirname, 'src/client/index.ts'),
	},
	mode: mode,
	output: {
		path: path.resolve(__dirname + '/dist/client'),
		filename: 'js/[name].[contenthash].js',
		publicPath: path.resolve(__dirname, '/client') + '/',
		chunkFilename: 'chunks/react.[name].chunk.js',
		clean: true,
		assetModuleFilename: 'images/[hash][ext]',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
		alias: webpackAliases,
	},
	devtool: isDev ? 'inline-source-map' : 'source-map',
	optimization: {
		moduleIds: 'deterministic',
		minimize: !isDev ? true: false,
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
					test: /[\/]node_modules[\/]((?!(react|react-dom|react-router-dom)).*)[\/]/,
					name: 'vendors/vendors-without-react-libs',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env', '@babel/react'],
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.ts(x?)$/,
				loader: 'ts-loader',
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
			{
				test: /\.svg$/,
			 	loader: 'svg-inline-loader',
			},
			{
				test: /\.png/,
				type: 'asset',
			},
		],
	},
	plugins: [
		...sharedPlugins,
		new BundleAnalyzerPlugin({
			generateStatsFile: isDev ? true: false,
		}),
	],
};
