import React, { Suspense, useEffect, useState } from 'react';
import { Await } from '@general-infrastructure/libs/deffered';
import { sleep } from '@general-infrastructure/libs/sleep/sleep';
import { Link } from 'react-router-dom';
import { Header } from './modules/components/global';
import Routes from './modules/routes/Routes';

export const Content = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log('hydrated');
	}, []);

	return (
		<>
		count: {count}
			<button onClick={() => setCount(prev => prev + 1)}>incr count</button>
			<Header />
			<div>
				<Link to="/overview">Overview</Link>
				<Link to="/lazy">lazy</Link>
				<Link to="/super-private-page">SUPER PRIVATE DONT CLICK</Link>
				<Link to="/microfronted/home">Microfrontend home</Link>
				<Routes />
			</div>

			<Suspense fallback={<div>Loader</div>}>
				<Await
					name="cat"
					getData={() => sleep(5000, 'World')}
				>
					{/* @ts-ignore */}
					{(data) => (<div>Hello {data}</div>)}
				</Await>
			</Suspense>
		</>
	);
};