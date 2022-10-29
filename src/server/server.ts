import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import { setServerCookie } from '@general-infrastructure/stores/cookieStore/shared';
import handleRequest from '@server/infrastructure/handleRequest/handleRequest';
import {routes} from '@general-infrastructure/routes/routes';
import { handleErrors } from '@server/middlewares/errorHandler/errorHandler';

const server = express();

server.use('/static', express.static(path.join(__dirname, '/static')));
server.use(cookieParser());

// TODO -
// 5. redux for theme

server.get('*', handleErrors(async function(req, res, next) {
	setServerCookie(req, res);
	handleRequest(req.url, res, routes);
}));

server.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});