import React from 'react';
import { Flex } from '@client/modules/components/shared';

import notFoundImg from './assets/404-error.png';
import { isNodeJS } from '@general-infrastructure/constants';

const NotFound = () => {
	return (
		<Flex customWidth='100%' flexDirection='column' alignItems='center'>
			{/* TODO ADD ISOMORPHIC IMAGE COMPONENT wich solve static src problem */}
			<img src={isNodeJS() ? `/static/${notFoundImg}` : notFoundImg} alt="Page not found" />
			<h2>Oops! Page not found</h2>
		</Flex>
	);
};

export default NotFound;