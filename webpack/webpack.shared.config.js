const { merge } = require('webpack-merge');
const { webpackAliases } = require('../config/aliases');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isDev = mode === 'development';

module.exports = {
	mode,
	isDev,
};

module.exports = {
	mode,
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
		alias: webpackAliases,
	},
	devtool: isDev ? 'inline-source-map' : 'source-map',
};