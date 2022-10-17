const { merge } = require('webpack-merge');
const commonConfig = require('./webpack/client/webpack.common');

module.exports = () => {
	const config = require('./webpack.' + process.env.NODE_ENV + '.js');
	return merge(commonConfig, config);
};