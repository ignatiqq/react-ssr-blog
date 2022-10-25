import React from 'react';

import './huse.scss';

const LazyComponent = ({hello}: {hello: string}) => {
	return (
		<div className='hello'>
		Lazy COMPONENT
			{hello}
		</div>
	);
};

export default LazyComponent;