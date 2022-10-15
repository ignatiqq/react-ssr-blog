import React from 'react';

interface ChildrenType {
	children: React.ReactNode;
}

export type HTMLDataType =  {
    assets: {[key: string]: string};
    globalStatements: {[key: string]: string};
    title: string;
}

type HTMLComponentPropsType = {HTMLData: HTMLDataType} & ChildrenType;

const Html: React.FC<HTMLComponentPropsType> = ({HTMLData, children}) => {
	const {title, assets, globalStatements} = HTMLData;
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<link rel="stylesheet" href={assets['client.css']} />
				<meta name="description" content="ignatiqq blog about programming" />
				<title>{title}</title>
			</head>
			<body>
				<div id="root">
					{children}
				</div>
				<script defer src={assets['client.js']} />
				<script src={assets['vendors-without-react-libs.js']} />
				<script src={assets['react-libs.js']} />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.__REACT_QUERY_STATE__ = ${globalStatements.__REACT_QUERY_STATE__};`,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.__HTML_ASSETS__ = ${JSON.stringify(globalStatements.__HTML_ASSETS__)};`,
					}}
				/>
			</body>
		</html>
	);
};

export default Html;