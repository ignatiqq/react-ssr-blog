import React from 'react';

import notFoundImg from './assets/404-error.png';

const NotFound = () => {
	return (
		<>
			<img src={notFoundImg} alt="Page not found" />
			<h2>Oops! Page not found</h2>
		</>
	);
};

export default NotFound;