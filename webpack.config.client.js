const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { webpackAliases } = require('./config/aliases');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isDev = mode === 'development';
const analysisMode = process.env.ANALYSIS_MODE ? true : false;

module.exports = {
	name: 'client',
	entry: {
		client: path.resolve(__dirname, 'src/client/index.tsx'),
	},
	mode: mode,
	output: {
		path: path.resolve(__dirname + '/dist/static'),
		filename: '[name].[contenthash].js',
		publicPath: path.resolve(__dirname, '/static'),
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
		alias: webpackAliases,
	},
	devtool: isDev ? 'inline-source-map' : 'source-map',
	optimization: {
		runtimeChunk: 'single',
		moduleIds: 'deterministic',
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
	plugins: [
		new WebpackManifestPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new BundleAnalyzerPlugin({
			generateStatsFile: isDev ? true: false,
			analyzerMode: analysisMode,
		}),
	],
};
