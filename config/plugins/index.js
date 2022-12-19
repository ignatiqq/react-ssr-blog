const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const moduleFederation = require('./moduleFederation');

module.exports = {
	sharedPlugins: [
		new Dotenv(),
		new WebpackManifestPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
		}),
		// moduleFederation.client,
	],
};
