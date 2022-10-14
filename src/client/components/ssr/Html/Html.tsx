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
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>{title}</title>
				{
					// key never changes
					assets.css.head.map(({rel, href}, i) => {
						return <link key={i} rel={rel} href={href} />;
					})
				}
				{
					// key never changes
					assets.meta.map(({name, content}, i) => {
						return <meta key={i} name={name} content={content} />;
					})
				}
				<meta name="description" content="ignatiqq blog about programming" />
			</head>
			<body>
				<div id="root">
					{children}
				</div>
			</body>
			{
				assets.scripts.body.map(getScriptTag)
			}
			{
				assets.variables.map(({name, value}) => {
					return (
						<script
							key={name}
							dangerouslySetInnerHTML={{
							    __html: `window.${name}: ${value}`,
						    }}
						/>
					);
				})
			}
		</html>
	);
};

export default Html;