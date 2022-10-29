const path = require('path');

const webpackAliases = {
	'@client': path.join(__dirname, '../', 'src/client'),
	'@server': path.join(__dirname, '../', 'src/server'),
	'@general-infrastructure': path.join(__dirname, '../', 'src/infrastructure'),
	'@api': path.join(__dirname, '../', 'src/api'),
};

module.exports = {
	webpackAliases,
};