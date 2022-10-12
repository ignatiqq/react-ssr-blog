import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Routes from '@client/infrastructure/Routes/Routes';

const App = () => {
	const [counter, increment] = useState(234234);

	function incrementFn() {
		console.log('increment');
		increment(prev => prev + 1);
	}

	return (
		<div>
			{counter}
			<button onClick={incrementFn}>Increment</button>
			<h1>HEADER HASH CHANGE</h1>
			<Link to="/overview">Overview</Link>
			<Routes />
		</div>
	);
};

export default App;