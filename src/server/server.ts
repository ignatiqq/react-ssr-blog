import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import handleRequest from '@server/infrastructure/handleRequest/handleRequest';
import {routes} from '@general-infrastructure/routes/routes';
import { handleErrors } from '@server/middlewares/errorHandler/errorHandler';

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use('/static', express.static(path.join(__dirname, 'static')));

// server.use(express.static(path.join(__dirname, 'static')));

// TODO -
// 5. redux for theme

server.get('*', handleErrors(async function(req, res) {
	handleRequest(req.url, res, routes).then(({component, __REACT_QUERY_STATE__ = ''}) => {
		res.render('client', { assets, component, __REACT_QUERY_STATE__ });
	});
}));

// server.get('*', (req: Request, res: Response) => {
// 	handleRequest(req.url, res, routes).then(({component, __REACT_QUERY_STATE__ = ''}) => {
// 		res.render('client', { assets, component, __REACT_QUERY_STATE__ });
// 	});
// });

server.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});