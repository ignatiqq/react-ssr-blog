import React from 'react';

import {Flex, Link, Wrap} from '@client/modules/components/shared';
import {MustAuthorized} from '@client/modules/authorization/components';

const Header = () => {
	return (
		<Wrap padding="20px">
			<Flex customWidth='100%' justifyContent='space-between' alignItems='center'>
				<div>
					SOCIALS
				</div>
				<div>
					<span>ignatiqq blog</span>
				</div>
				<div>
					<Link href={'https://github.com/ignatiqq/react-ssr-blog'}>source code</Link>
				</div>
				<MustAuthorized>
					<div>
						ADMIN
					</div>
				</MustAuthorized>
			</Flex>
		</Wrap>
	);
};

export default Header;