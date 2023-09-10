import React from 'react';

import {MustAuthorized} from '@client/modules/authorization/components';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<div>
					SOCIALS
			</div>
			<div>
				<span>ignatiqq blog</span>
			</div>
			<div>
				<Link to={'https://github.com/ignatiqq/react-ssr-blog'}>source code</Link>
			</div>
			<MustAuthorized>
				<div>
						ADMIN
				</div>
			</MustAuthorized>
		</>
	);
};

export default Header;