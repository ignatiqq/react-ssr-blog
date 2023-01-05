const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {isDev} = require('../webpack.shared.config');
const moduleFederation = require('../shared/mfe/module-federation');

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
		moduleFederation.client,
	],
	server: [
		new Dotenv(),
		new WebpackManifestPlugin(),
		moduleFederation.server,
	],
};


module.exports = plugins;
