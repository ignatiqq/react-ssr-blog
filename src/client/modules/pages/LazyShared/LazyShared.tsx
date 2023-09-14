import React from 'react';

// @ts-ignore
import s from './LazyShared.module.scss';

export const LazyComponentShared = () => {
	return (
		<div className={s.helloWorld}>
		Lazy COMPONENT shared
		</div>
	);
};
