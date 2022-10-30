import React from 'react';
import styled from 'styled-components';

import {ReactComponent as LoaderSVG} from './assets/loader.svg';

interface LoaderType {
    width?: string;
    height?: string;
    fill?: string;
}

const StyledLoader = styled(LoaderSVG)`
    fill: ${(props) => props.theme.colors.secondary};
    width: ${({width}) => `width: ${width}`},
    height: ${({height}) => `height: ${height}`}
`;

const Loader: React.FC<LoaderType> = ({width = '100%', height = '100%', fill}) => {
	const props = {
		width,
		height,
		fill,
	};
	return (
		<StyledLoader {...props} />
	);
};

export default Loader;