import React, { Suspense } from 'react';
import { Await } from '@general-infrastructure/libs/deffered';
import { sleep } from '@general-infrastructure/libs/sleep/sleep';
import { Link } from 'react-router-dom';
import { Header } from './modules/components/global';
import Routes from './modules/routes/Routes';

export const Content = () => {
	return (
		<>
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
					getData={() => sleep(5000)}
				>
					{/* @ts-ignore */}
					{(data) => (<div>Hello</div>)}
				</Await>
			</Suspense>
		</>
	);
};