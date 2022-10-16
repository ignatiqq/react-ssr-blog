import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import Routes from './infrastructure/Routes/Routes';
// import { Html } from '@client/components/ssr';
// import type {HTMLDataType} from '@client/components/ssr/Html/Html';

// interface AppPropsType {
// 	HTMLData?: HTMLDataType;
// }

const App: React.FC = () => {
	const [counter, increment] = useState(234234);

	function incrementFn() {
		console.log('increment');
		increment(prev => prev + 1);
	}

	return (
		<Suspense fallback={'Loading...'}>
			<div>
				{counter}
				<button onClick={incrementFn}>Increment</button>
				<h1>HEADER HASH CHANGE</h1>
				<Link to="/overview">Overview</Link>
				<Link to="/lazy">lazy</Link>
				<Routes />
			</div>
		</Suspense>
	);
};

export default App;