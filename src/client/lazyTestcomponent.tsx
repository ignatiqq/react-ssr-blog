import React from 'react';

import './lazyTest.scss';
import { Image } from '@client/modules/components/shared/Image/Image';

const LazyTestcomponent = () => {
	return (
		<>
			<Image src="123" alt='123' />
			<div className="test">lazyTestcomponent</div>
		</>
	);
};

export default LazyTestcomponent;