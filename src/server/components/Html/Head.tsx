import React from 'react';

export type HTMLDataType = {
    assets: {[key: string]: string};
    globalStatements: {[key: string]: string};
    title: string;
}

export const Head = ({htmlData}: {htmlData: HTMLDataType}) => {
	return (
		<head>
			<meta charSet="utf-8" />
			<link rel="stylesheet" href={htmlData.assets['client.css']} />
			<meta name="description" content="ignatiqq blog about programming" />
			<script defer src={htmlData.assets['client.js']} />
			<script defer src={htmlData.assets['vendors/vendors-without-react-libs.js']} />
			<script src={htmlData.assets['vendors/react-libs.js']} />
			<script
				dangerouslySetInnerHTML={{
					__html: `window.__REACT_QUERY_STATE__ = ${htmlData.globalStatements.__REACT_QUERY_STATE__};`,
				}}
			/>
			<title>{htmlData.title}</title>
		</head>
	);
};