import express from 'express';
import path from 'path';

import handleRequest from '@server/infrastructure/handleRequest/handleRequest';
import {routes} from '@general-infrastructure/routes/routes';
import { handleErrors } from '@server/middlewares/errorHandler/errorHandler';

const server = express();

console.log(path.join(__dirname, '/static'));
server.use('/static', express.static(path.join(__dirname, '/static')));

// TODO -
// 5. redux for theme

server.get('*', handleErrors(async function(req, res, next) {
	handleRequest(req.url, res, routes);
}));

server.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});