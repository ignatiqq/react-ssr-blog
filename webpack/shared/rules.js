const rules = [
	{
		test: /\.(js|jsx)$/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/env', '@babel/react'],
			},
		},
		exclude: /node_modules/,
	},
	{
		test: /\.ts(x?)$/,
		loader: 'ts-loader',
		exclude: /node_modules/,
	},
	{
		test: /\.svg$/,
		loader: 'svg-inline-loader',
	},
	{
		test: /\.png/,
		type: 'asset',
	},
];

module.exports = {rules};
