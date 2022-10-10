import React, { useEffect, useState } from 'react';
import { Routes } from '@general-infrastructure/routes/routes';

const App = () => {
	const [counter, increment] = useState(234234);

	function incrementFn() {
		console.log('increment');
		increment(prev => prev + 1);
	}

	useEffect(() => {
		console.log('EFFECT');
	});

	return (
		<div>
			{counter}
			<button onClick={incrementFn}>Increment</button>
			<h1>HEADER HASH CHANGE</h1>
			{/* <Routes /> */}
		</div>
	);
};

export default App;