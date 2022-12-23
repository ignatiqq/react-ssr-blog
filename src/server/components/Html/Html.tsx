import React from 'react';

interface ChildrenType {
	children: React.ReactNode;
}

export type HTMLDataType = {
    assets: {[key: string]: string};
    globalStatements: {[key: string]: string};
    title: string;
}

type HTMLComponentPropsType = {HTMLData: HTMLDataType} & ChildrenType;

const Html: React.FC<HTMLComponentPropsType> = ({HTMLData, children}) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<link rel="stylesheet" href={HTMLData.assets['client.css']} />
				<meta name="description" content="ignatiqq blog about programming" />
				<title>{HTMLData.title}</title>
			</head>
			<body>
				<noscript
					dangerouslySetInnerHTML={{
						__html: '<b>Enable JavaScript to run this app.</b>',
					}}
				/>
				<div id="root">
					{children}
				</div>
				<script defer src={HTMLData.assets['client.js']} />
				<script defer src={HTMLData.assets['vendors/vendors-without-react-libs.js']} />
				<script src={HTMLData.assets['vendors/react-libs.js']} />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.__REACT_QUERY_STATE__ = ${HTMLData.globalStatements.__REACT_QUERY_STATE__};`,
					}}
				/>
			</body>
		</html>
	);
};

export default Html;