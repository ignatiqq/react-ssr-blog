import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import { setServerCookie } from '@general-infrastructure/stores/cookieStore/shared';
import handleRequest from '@server/infrastructure/handleRequest/handleRequest';
import {routes} from '@general-infrastructure/routes/routes';
import { handleErrors } from '@server/middlewares/errorHandler/errorHandler';
import { ServerResponseTaskManagerType } from './infrastructure/taskManager/taskManager';
import { createResponseStream, ResponseStreamType } from './modules/responseStream/responseStream';
import { createResponseTaskManager } from './modules/responseTaskManager/responseTaskManager';

const server = express();

server.use('/static', express.static(path.join(__dirname, '../../client')));

server.use(cookieParser());

server.get('*', handleErrors(async function(req, res, next) {
	// create stream for our render stream flow
	const responseStream: ResponseStreamType = createResponseStream();
	const taskManager: ServerResponseTaskManagerType = createResponseTaskManager();
	setServerCookie(req, res);
	handleRequest(req.url, res, routes, {responseStream, taskManager});
}));

server.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});