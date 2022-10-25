import { LIGHT, DARK } from '@client/contants/styles/theme';
import { lightTheme, darkTheme, theme } from './theme';

interface ITheme {
  [key: string]: object;
}

function getAppTheme(params: 'LIGHT' | 'DARK'): ITheme {
	switch (params) {
	case LIGHT:
		{
			return {
				...theme,
				colors: {
					...lightTheme,
				},
			};
		}
		break;

	case DARK:
		{
			return {
				...theme,
				colors: {
					...darkTheme,
				},
			};
		}
		break;

	default:
		{
			return {
				...theme,
				colors: {
					...lightTheme,
				},
			};
		}
		break;
	}
}

export default getAppTheme;