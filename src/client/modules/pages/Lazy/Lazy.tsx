import React from 'react';
import { Image } from '@client/modules/components/shared/Image/Image';

import './huse.scss';

const LazyComponent = ({hello}: {hello: string}) => {
	return (
		<div className='hello'>
			<Image src="123" alt='123' />
			Lazy COMPONENT
			{hello}
		</div>
	);
};

export default LazyComponent;