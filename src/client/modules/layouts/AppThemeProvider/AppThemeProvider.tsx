import React from 'react';
import { ThemeProvider } from 'styled-components';

import { LIGHT, DARK } from '@client/constants/styles/theme';
import { getAppTheme } from '@client/styles/theme';


interface IAppThemeProviderProps {
  children: React.ReactElement;
  theme?: 'LIGHT' | 'DARK';
}

const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
	children,
	theme = LIGHT,
}) => {
	return <ThemeProvider theme={getAppTheme(theme)}>{children}</ThemeProvider>;
};

export default AppThemeProvider;