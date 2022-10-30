import React from 'react';
import { Flex } from '@client/modules/components/shared';

import { ReactComponent as NotFoundPNG } from './assets/404-error.png';

const NotFound = () => {
	return (
		<Flex customWidth='100%' flexDirection='column' alignItems='center'>
			<NotFoundPNG />
			<h2>Oops! Page not found</h2>
		</Flex>
	);
};

export default NotFound;