const clientConfig = require('./client/webpack.config.client');
const sharedConfig = require('./webpack.shared.config');
const {merge} = require('webpack-merge');

module.exports = merge(sharedConfig, clientConfig);
