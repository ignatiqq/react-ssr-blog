import React from 'react';

interface ChildrenType {
	children: React.ReactNode;
}

export type HTMLDataType =  {
    assets: {[key: string]: string};
    globalStatements: {[key: string]: string};
    title: string;
}

type HTMLComponentPropsType = {HTMLData: HTMLDataType} & ChildrenType | undefined;

const Html: React.FC<HTMLComponentPropsType> = ({HTMLData, children}) => {
	const {title, assets, globalStatements} = HTMLData;
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>{title}</title>
				<link rel="stylesheet" href={assets['client.css']} />
				<meta name="description" content="ignatiqq blog about programming" />
			</head>
			<body>
				<div id="root">
					{children}
				</div>
			</body>
			<script defer src={assets['static.src_client_modules_pages_Lazy_tsx.bundle.js']} />
			<script defer src={assets['client.js']} />
			<script src={assets['vendors-without-react-libs.js']} />
			<script src={assets['react-libs.js']} />
			<script
				dangerouslySetInnerHTML={{
					__html: `window.__REACT_QUERY_STATE__: ${globalStatements.__REACT_QUERY_STATE__}`,
				}}
			/>
		</html>
	);
};

export default Html;