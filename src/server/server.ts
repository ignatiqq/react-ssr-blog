import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

// client imports
import handleRequest from '../infrastructure/handleRequest/handleRequest';
import routes from '../infrastructure/routes/routes';

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use('/', express.static(path.join(__dirname, 'static')));

const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8'
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
  handleRequest(req.url, routes).then(({component, state}) => {
    res.render('client', { assets, component, queryState: state })
  });
})

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})