import React from 'react';

export type HTMLDataType = {
    assets: {[key: string]: string};
    globalStatements: {[key: string]: string};
    title: string;
}

export const Head = ({htmlData}: {htmlData: HTMLDataType}) => {
	console.log({htmlData});
	return (
		<head>
			<meta charSet="utf-8" />
			<link rel="stylesheet" href={htmlData.assets['client.css']} />
			<meta name="description" content="ignatiqq blog about programming" />
			{/* we should use async typef of scripts loading */}
			{/* because of our teleporting promises feature */}
			{/* defer script runs only after html request is done */}
			{/* but we need progressive stream and HYDRATION */}
			<script async src={htmlData.assets['client.js']} />
			<script async src={htmlData.assets['vendors/vendors-without-react-libs.js']} />
			<script async src={htmlData.assets['vendors/react-libs.js']} />
			<script
				dangerouslySetInnerHTML={{
					__html: `window.__REACT_QUERY_STATE__ = ${htmlData.globalStatements.__REACT_QUERY_STATE__};`,
				}}
			/>
			<title>{htmlData.title}</title>
		</head>
	);
};