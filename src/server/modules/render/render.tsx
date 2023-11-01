/* eslint-disable max-len */
/* eslint-disable max-lines */
import fs from 'fs';
import { readFile } from 'fs/promises';
import React from 'react';
import path from 'path';
import { Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query';

import { ABORT_DELAY } from '@server/constants/render';
import { ErrorType } from '@server/types';
import {createStyleStream, discoverProjectStyles} from 'used-styles';
import { PassThrough, Transform, Writable } from 'stream';
import {ChunkLoadingCollector, ChunkLoadingContext, ChunkLoadingProvider} from '@general-infrastructure/libs/chunkLoadingCollector';
import { importAssets } from 'webpack-imported';


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

const getImportedStats = (function () {
	let stats: any;

	return async (path: string) => {
	  if(!!stats) return stats;

	  const file = await readFile(path, 'utf-8');
	  stats = JSON.parse(file);
	  return stats;
	};
})();

const render = async (res: Response, options: RenderOptions) => {
	const {url, queryClient, queryState, title} = options;

	let resolve: any;
	let reject;

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	await stylesLookup;
	const stats = await getImportedStats(path.join(__dirname, '../../imported.json'));

	const chunkStatsTracker = new ChunkLoadingCollector(importAssets).initStats(stats);

	const styleStream = createStyleStream(stylesLookup, (file: string) => {
		console.log({ file, chunkStatsTracker: chunkStatsTracker.shouldBeLoadedStyles.has(file) });
		if(!chunkStatsTracker.shouldBeLoadedStyles.has(file)) return '';
		return `<link rel="stylesheet" href="/static/${file}" data-used-style />` + moveDataUsedStylesToHeaderScriptText;
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

	res.write(`
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
		/**
		 * constructor
		 */
		constructor(readonly res: Response) {
			super();
			this.res = res;
		}
	
		/**
		 * reassign write method
		 */
		_write(htmlChunk: Buffer, encoding: BufferEncoding, callback: (error?: Error) => void): void {
			const html = htmlChunk.toString('utf-8');
			const canWrite = this.res.write(html, 'utf-8', callback);
			console.log({canWrite});
		}
	
		flush() {
			if (typeof (this.res as any).flush === 'function') {
				(this.res as any).flush();
			}
		}
	}

	const htmlToStreamWriteableStream = new HtmlToStreamWriteable(res);

	htmlToStreamWriteableStream.on('finish', () => {
		console.log('finish');
		// @ts-ignore
		resolve(responseStream);
	});

	const root = import('@client/App').then(data => {
		const App = data.default;

		const stream = renderToPipeableStream(
			<ChunkLoadingProvider collector={chunkStatsTracker}>
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
				</StaticRouter>
			</ChunkLoadingProvider>,
			{
				bootstrapScriptContent: BOOTSTRAP_BEFORE_HYDRATE_SCRIPT_STRING,
				onShellReady() {
					res.statusCode = didError ? 500 : 200;
					stream.pipe(styleStream).pipe(htmlToStreamWriteableStream);
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