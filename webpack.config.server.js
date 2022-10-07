const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const {webpackAliases} = require('./config/aliases.js');

module.exports = {
    name: 'server',
    entry: {
      server: path.resolve(__dirname, 'src/server/server.ts'),
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
      alias: webpackAliases,
    },
    externals: [nodeExternals()],
    target: 'node',
    node: {
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.server.json',
          },
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ 
          from: path.resolve(__dirname, 'src/server/views'), to: path.resolve(__dirname, 'dist/views') }],
      }),
    ]
};