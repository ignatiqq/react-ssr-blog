/* eslint-disable max-lines */
import fs from 'fs';
import React from 'react';
import path from 'path';
import { Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query';

import { ABORT_DELAY } from '@server/constants/render';
import { ErrorType } from '@server/types';
import {createLink, createStyleStream, discoverProjectStyles} from 'used-styles';
import { PassThrough, Transform, Writable } from 'stream';


interface RenderOptions {
	url: string;
	queryClient: QueryClient;
	queryState: string;
	title: string;
}

const stylesLookup = discoverProjectStyles(path.join(__dirname, '../../client'));

const BOOTSTRAP_BEFORE_HYDRATE_SCRIPT_STRING =
'typeof window._HYDRATE === "function" ? window._HYDRATE() : window._HYDRATE = true';

const moveDataUsedStylesToHeaderScriptText = `<script data-remove-used>
		var linkTags = document.querySelectorAll('[data-used-style]');
		console.log({linkTags})
		var root = document.head.firstChild;
		// remove in two steps to prevent flickering
		for (var i = 0; i < linkTags.length; ++i) {
			document.head.insertBefore(linkTags[i].cloneNode(true), root);
		}
		for (var i = 0; i < linkTags.length; ++i) {
			linkTags[i].parentNode.removeChild(linkTags[i]);
		}

		console.log(document.querySelectorAll('[data-remove-used]'));
		document.querySelectorAll('[data-remove-used]').forEach((node) => {
			console.log({node});
			node.remove();
		})
</script>`;

const render = async (res: Response, options: RenderOptions) => {
	const {url, queryClient, queryState, title} = options;

	let resolve: any;
	let reject;

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	await stylesLookup;

	const styleStream = createStyleStream(stylesLookup, (file: string) => {
		console.log({file});
		return `<link rel="stylesheet" href="/static/${file}" data-used-style />`;
	});

	const manifest = fs.readFileSync(
		path.join(__dirname, '../../client/manifest.json'),
		'utf-8',
	);

	// assets html data
	const assets = JSON.parse(manifest);
	const assetsHtmlData = {
		assets,
		title,
	};
	const globalStatements = {
		__REACT_QUERY_STATE__: queryState,
	};
	let didError = false;

	const assetsWithGlobalStatements = {
		...assetsHtmlData,
		globalStatements,
	};
	res.setHeader('Content-type', 'text/html');

	const responseStream = new PassThrough();

	const addMoveStyleScriptToEveryDataUsedLink = new Transform({
		// transform() is called with each chunk of data
		// tslint:disable-next-line:variable-name
		transform(chunk, _, _callback) {

			_callback(undefined, chunk.toString() + moveDataUsedStylesToHeaderScriptText);
		},
	});

	responseStream.pipe(res);

	responseStream.push(`
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<link rel="stylesheet" href="${assetsWithGlobalStatements.assets['css/src_client_bootstrap_tsx-webpack_sharing_consume_default_react-dom_react-dom.css']}" />
			<script async src="${assetsWithGlobalStatements.assets['client.js']}"></script>
			<script async src="${assetsWithGlobalStatements.assets['vendors-node_modules_react_index_js.js']}"></script>
			<script async src="${assetsWithGlobalStatements.assets['src_client_bootstrap_tsx-webpack_sharing_consume_default_react-dom_react-dom.js']}"></script>
			<script async src="${assetsWithGlobalStatements.assets['vendors-node_modules_react-dom_index_js.js']}"></script>
			<script async src="${assetsWithGlobalStatements.assets['vendors-node_modules_axios_index_js-node_modules_react-dom_client_js-node_modules_react-route-074f6b.js']}"></script>
			<meta name="description" content="ignatiqq blog about programming" />
			<title>Title</title>
		</head>
		<body>
	`);

	class HtmlToStreamWriteable extends Writable {
		constructor() {
			super();
		}

		_write(htmlChunk: any, encoding: BufferEncoding, callback: (error?: Error) => void): void {
			const html = htmlChunk.toString('utf-8');

			console.log({html, htmlChunk});

			responseStream.push(html);
			console.log('AFTER PUSH');

			callback();
		}
	}

	const htmlToStreamWriteableStream = new HtmlToStreamWriteable();

	htmlToStreamWriteableStream.on('finish', () => {
		console.log('finish');
		// @ts-ignore
		resolve(responseStream);
	});

	const root = import('@client/App').then(data => {
		const App = data.default;

		const stream = renderToPipeableStream(
			<StaticRouter location={url}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={JSON.parse(queryState)}>
						{/* we should generete div with id root in the reactPipeableStream shell
							because we need close tag before "bootstrapScriptContent" and other scripts
							to avoid hydration issues
						*/}
						<div id="root">
							<App />
						</div>
					</Hydrate>
				</QueryClientProvider>
			</StaticRouter>,
			{
				bootstrapScriptContent: BOOTSTRAP_BEFORE_HYDRATE_SCRIPT_STRING,
				onShellReady() {
					res.statusCode = didError ? 500 : 200;
					stream.pipe(styleStream).pipe(addMoveStyleScriptToEveryDataUsedLink).pipe(htmlToStreamWriteableStream);
					console.log({stream});
				},
				onAllReady() {
				},
				onError(err) {
					didError = true;
					res.statusCode = 500;
					console.error((err as ErrorType).message);
				},
			},
		);

		setTimeout(() => {
			stream.abort();
		}, ABORT_DELAY);
	});

	return promise;
};

export default render;