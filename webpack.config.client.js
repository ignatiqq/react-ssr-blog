const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { webpackAliases } = require('./config/aliases');

module.exports = {
	name: 'client',
	entry: {
		client: path.resolve(__dirname, 'src/client/index.tsx'),
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '/dist/static'),
		filename: '[name].[contenthash].js',
		publicPath: path.resolve(__dirname, '/dist'),
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
	plugins: [new WebpackManifestPlugin(), new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
	})],
};
