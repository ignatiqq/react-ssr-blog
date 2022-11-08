import React from 'react';

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