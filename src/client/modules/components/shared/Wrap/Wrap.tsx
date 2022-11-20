import React from 'react';
import styled from 'styled-components';
import {StyledContainerType} from '@client/modules/components/shared/types';

interface WrapPropTypes {
    padding?: string;
    margin?: string;
}

const StyledWrap = styled.div<WrapPropTypes>`
  margin: ${({margin}) => margin || 'auto'};
  padding: ${({padding}) => padding || 'auto'};
`;

const Wrap: React.FC<StyledContainerType<WrapPropTypes>> = (props) => {
	return <StyledWrap {...props} />;
};

export default Wrap;