import React from 'react';

interface ChildrenType {
	children: React.ReactNode;
}

type HTMLComponentPropsType = {HTMLData: HTMLDataType} & ChildrenType;

const Html: React.FC<HTMLComponentPropsType> = ({HTMLData, children}) => {
	return (
		<html lang="en">
			<head>

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
			</body>
		</html>
	);
};

export default Html;