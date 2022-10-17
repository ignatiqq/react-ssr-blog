const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	output: {
		filename: '[name].[contenthash].js',
	},
	devtool: 'source-map',
	optimization: {
		moduleIds: 'deterministic',
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	plugins: [
		new WebpackManifestPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	],
};