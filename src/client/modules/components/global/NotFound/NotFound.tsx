import React from 'react';
import { Flex } from '@client/modules/components/shared';

import notFoundImg from './assets/404-error.png';

const NotFound = () => {
	return (
		<Flex customWidth='100%' flexDirection='column' alignItems='center'>
			<img src={notFoundImg} alt="Page not found" />
			<h2>Oops! Page not found</h2>
		</Flex>
	);
};

export default NotFound;