import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import Routes from './infrastructure/Routes/Routes';

import { AppThemeProdvider } from '@client/modules/layouts';
import {Container} from '@client/shared/';
import { Header } from '@client/modules/global';

const App: React.FC = () => {
	return (
		<Suspense fallback={'Loading...'}>
			<AppThemeProdvider>
				<Container>
					<Header />
					<div>
						<Link to="/overview">Overview</Link>
						<Link to="/lazy">lazy</Link>
						<Routes />
					</div>
				</Container>
			</AppThemeProdvider>
		</Suspense>
	);
};

export default App;