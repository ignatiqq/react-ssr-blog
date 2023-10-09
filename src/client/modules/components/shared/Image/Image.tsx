import React from 'react';

import './Image.scss';

type PropTypes = {
    src: string;
    alt: string;
}

export const Image: React.FC<PropTypes> = ({
	src,
	alt,
}) => {
	return (
		<img className="helloBundle" src={src} alt={alt} />
	);
};