const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	output: {
		filename: '[name].js',
	},
	devtool: 'inline-source-map',
	optimization: {
		moduleIds: 'named',
		minimize: false,
		minimizer: [],
	},
	plugins: [
		new WebpackManifestPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
};