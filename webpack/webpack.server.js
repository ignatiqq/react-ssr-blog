const serverConfig = require('./server/webpack.config.server');
const sharedConfig = require('./webpack.shared.config');
const {merge} = require('webpack-merge');

module.exports = merge(sharedConfig, serverConfig);
