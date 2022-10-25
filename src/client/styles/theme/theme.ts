import { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
 50% { background: #fff; box-shadow: 0 -200px 100px -100px #eee inset; }
`;

const theme = {
	colors: {
		primaryText: '#4C4C4C',
		secondaryText: '#888888',
		primary: '#CD8802',
		secondary: '#f6f6ef',
		error: 'red',
	},
	mediaQueries: {
		mobile: '480px',
		table: '768px',
		desktop: '992px',
		desktopXl: '1280px',
		desktop2Xl: '1536px',
	},
	fonts: {
		small: '12px',
		normal: '16px',
		large: '24px',
	},
	transition: {
		hover: 'all .3s ease',
	},
	animations: {
		background: breatheAnimation,
	},
};

const lightTheme = {
	primaryText: '#4C4C4C',
	secondaryText: '#888888',
	primary: '#CD8802',
	secondary: '#f6f6ef',
};

const darkTheme = {
	primaryText: '#FFFFFF',
	secondaryText: '#AEAEAE',
	primary: '#4C4C4C',
	secondary: '#888888',
};

export { theme, lightTheme, darkTheme };