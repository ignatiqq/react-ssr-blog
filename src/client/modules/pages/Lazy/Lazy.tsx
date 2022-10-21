import React from 'react';

import './huse.scss';

const LazyComponent = ({hello}: {hello: string}) => {
	console.log(hello);
	return (
		<div className='hello'>
		Lazy COMPONENT
			{hello}
		</div>
	);
};

export default LazyComponent;