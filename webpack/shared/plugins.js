const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');
const {isDev} = require('../webpack.shared.config');
const moduleFederation = require('../shared/mfe/module-federation');
const { ImportedPlugin } = require('webpack-imported');

const plugins = {
	client: [
		new MiniCssExtractPlugin({
			filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash].css',
		}),
		new Dotenv(),
		new WebpackManifestPlugin(),
		new BundleAnalyzerPlugin({
			generateStatsFile: isDev ? true: false,
		}),
		new ImportedPlugin('imported.json', {
			saveToFile: path.join(__dirname, '../../dist/server', 'imported.json'),
		}),
		...moduleFederation.client,
	],
	server: [
		new Dotenv(),
		new WebpackManifestPlugin(),
		...moduleFederation.server,
	],
};


module.exports = plugins;
