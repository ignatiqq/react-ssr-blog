import React from 'react';
import styled from 'styled-components';

import type {StyledContainerType} from '../types';

interface IFlexType {
    flexDirection?: 'row' | 'column';
    alignItems?: 'center' | 'flex-start' | 'flex-end';
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
    customWidth?: string;
}

const StyledFlex = styled.div<IFlexType>`
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    align-items: ${({ alignItems }) => alignItems || 'stretch'};
    justify-content: ${({ justifyContent }) => justifyContent || 'stretch'};
    width: ${({ customWidth }) => customWidth || 'auto'};
`;

const Flex: React.FC<StyledContainerType<IFlexType>> = ({
	flexDirection,
	alignItems,
	justifyContent,
	customWidth,
	children,
}) => {
	const styled = {
		flexDirection,
		alignItems,
		justifyContent,
		customWidth,
	};
	return (
		<StyledFlex {...styled}>{children}</StyledFlex>
	);
};

export default Flex;