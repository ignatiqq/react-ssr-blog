import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

// generals
import {setClient} from '../api/config';

// utils
import {getRouteByReqUrl} from './utils/url';

// client imports
import App from '../client/App';
import routes from '../client/routes/routes';

setClient(axios);

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use('/', express.static(path.join(__dirname, 'static')));

const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8'
);
const assets = JSON.parse(manifest);

server.get('*', (req, res, next) => {

  // const activeRoute = getRouteByReqUrl(req.url, routes);
  
  // if(activeRoute?.getInitialData) {
    
  // }

  // TODO - 
  // 1. Static Router
  // 2. infrastructure useQuery
  // 3. useAppQuery endpoints
  // 4. window.__initial_query__
  // https://tanstack.com/query/v4/docs/guides/ssr
  // 5. redux for theme

  const component = ReactDOMServer.renderToString(
      React.createElement(App)
  );
    // TODO ADD CSS
  res.render('client', { assets, component })
})

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})