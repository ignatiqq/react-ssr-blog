import React from 'react';
import styled, {ThemeProps} from 'styled-components';
import {Link} from 'react-router-dom';

import type {ThemeType} from '@client/styles/theme';

interface GeneralLinkTypes {
	textDecoration?: string;
}

const StyledLinkSPA = styled(Link)<ThemeProps<ThemeType> & GeneralLinkTypes>`
  	color: ${({theme}) => theme.colors.primaryText};
	text-decoration: ${({textDecoration}) => textDecoration || 'none'};
`;

const StyledLink = styled.a<GeneralLinkTypes>`
	color: ${({theme}) => theme.colors.primaryText};
	text-decoration: ${({textDecoration}) => textDecoration || 'none'};
`;


export {StyledLink as Link, StyledLinkSPA as LinkSPA};