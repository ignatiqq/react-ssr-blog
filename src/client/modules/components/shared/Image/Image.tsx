import React from 'react';

import {isNodeJS} from '@general-infrastructure/constants';

type PropTypes = {
    src: string;
    alt: string;
}

const Image: React.FC<PropTypes> = ({
	src,
	alt,
}) => {
	return (
		<img src={src} alt={alt} />
	);
};

export default Image;