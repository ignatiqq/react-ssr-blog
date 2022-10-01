const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  name: 'client',
  entry: {
    client: path.resolve(__dirname, 'src/client/index.tsx'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname + '/dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
  rules: [
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babe/react']
                },
            },
            exclude: /node_modules/
        },
        {
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            options: {
                configFile: 'tsconfig.client.json',
            },
            exclude: /node_modules/
        },
    ],
  },
  plugins: [new WebpackManifestPlugin()],
}