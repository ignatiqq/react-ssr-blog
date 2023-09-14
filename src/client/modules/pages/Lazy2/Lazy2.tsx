import React from 'react';
import { LazyComponentShared } from '../LazyShared/LazyShared';

import s from './huse2.module.scss';

export const LazyComponent2 = ({hello}: {hello: string}) => {
	return (
		<div className={s.hello}>
			<LazyComponentShared />
		Lazy COMPONENT
			{hello}
		</div>
	);
};

export default LazyComponent2;