import React from 'react';
import fs from 'fs';
import path from 'path';

import { renderToString } from 'react-dom/server';
import { Head } from '@server/components/Html/Head';


interface RenderOptions {
	queryState: string;
	title: string;
}

export function preapareHeadHtml(options: RenderOptions) {
	const {queryState, title} = options;

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

	const assetsWithGlobalStatements = {
		...assetsHtmlData,
		globalStatements,
	};

	return renderToString(<Head htmlData={assetsWithGlobalStatements} />);
}
