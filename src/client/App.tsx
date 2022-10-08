import React from 'react';
import { clientRoutes } from '@general-infrastructure/routes/routes';

const App = () => {
	return (
		<div>
			<h1>HEADER</h1>
			{clientRoutes}
		</div>
	);
};

export default App;