import React from 'react';

interface ScriptType {
    src: string;
    async: 'defer' | 'async';
}

interface AssetsType {
    css: {
        head: {
            href: string;
            rel: string;
        }[],
    },
    meta: {name: string, content: string}[];
    scripts: {
        head: ScriptType[],
        body: ScriptType[]
    };
}

interface HTMLPropsType {
    assets: AssetsType;
    globalStatements: {[key: string]: string};
    title: string;
    children: React.ReactNode;
}

const getScriptTag = (props: ScriptType, i: number) => {
	const {src, async} = props;
	switch (async) {
	case 'async':
		return <script key={i} src={src} async />;
		break;

	case 'defer':
		return <script key={i} src={src} defer />;
		break;

	default:
		return <script key={i} src={src} />;
		break;
	}
};

const Html: React.FC<HTMLPropsType> = ({ assets, globalStatements, title, children}) => {
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
		</html>
	);
};

export default Html;