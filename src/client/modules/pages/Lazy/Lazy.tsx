import React from 'react';
import { LazyComponentShared } from '../LazyShared/LazyShared';

import s from './huse.module.scss';


const LazyComponent = ({hello}: {hello: string}) => {
	return (
		<div className={s.hello}>
			<LazyComponentShared />
		Lazy COMPONENT
			{hello}
		</div>
	);
};

export default LazyComponent;