import React from 'react';
import styled from 'styled-components';

import type {StyledContainerType} from '../types';

type ContainerType = {
    maxWidth?: string;
    children: React.ReactNode;
}

const StyledContainer = styled.div<ContainerType>`
  background: #f6f6ef;
  max-width: ${({maxWidth}) => maxWidth ? `${maxWidth}` : '1400px'};
  margin: 0 auto;
`;

const Container: React.FC<StyledContainerType<ContainerType>> = ({maxWidth, children}) => {
	return <StyledContainer maxWidth={maxWidth}>{children}</StyledContainer>;
};

export default Container;