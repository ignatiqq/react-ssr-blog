import React from 'react';

import {Flex} from '@client/shared';
import { MustAuthorized } from '@client/modules/authorization/components';

const Header = () => {

	return (
		<Flex customWidth='100%' justifyContent='space-between' alignItems='center'>
			<div>
                SOCIALS
			</div>
			<div>
                ignatiqq blog
			</div>
			<div>
                some text
			</div>
			<MustAuthorized>
				<div>
					ADMIN
				</div>
			</MustAuthorized>
		</Flex>
	);
};

export default Header;