import express from 'express';
import fs from 'fs';
import path from 'path';

import handleRequest from '@server/infrastructure/handleRequest/handleRequest';
import routes from '@general-infrastructure/routes/routes';

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use('/', express.static(path.join(__dirname, 'static')));

const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
	'utf-8',
);
const assets = JSON.parse(manifest);

  // TODO - 
  // 1. Static Router
  // 2. infrastructure useQuery
  // 3. useAppQuery endpoints
  // 4. window.__initial_query__
  // https://tanstack.com/query/v4/docs/guides/ssr
  // 5. redux for theme

server.get('*', (req, res, next) => {
  handleRequest(req.url, routes).then(({component, __REACT_QUERY_STATE__ = ''}) => {
    console.log(__REACT_QUERY_STATE__);
    res.render('client', { assets, component, __REACT_QUERY_STATE__ })
  });
})

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})