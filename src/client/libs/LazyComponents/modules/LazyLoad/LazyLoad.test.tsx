import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';

import type { ILazyLoad } from './LazyLoad';
import LazyLoad from './LazyLoad';
import { loadWithRetry } from '@client/libs/LazyComponents/utils';

jest.mock('@client/libs/LazyComponents/utils');

let props: ILazyLoad<any>;
let loadWithRetryMock: jest.Mock;
let Component: React.FC<any>;

describe('LazyLoad component tests', () => {
	beforeEach(() => {
		props = {
			load: jest.fn().mockResolvedValue('Component'),
			render: (Component) => <Component />,
		};
		Component = function AnyComponent() {return (<div>Test lazy component text</div>);};
		loadWithRetryMock = jest.mocked(loadWithRetry);
		loadWithRetryMock.mockClear();
	});
	it('should render default Suspense fallback, and component after that', async () => {
		loadWithRetryMock.mockResolvedValue({default: Component});
		render(<LazyLoad {...props} />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
		expect(loadWithRetryMock).toHaveBeenCalledTimes(1);
		await waitFor(() => {
			expect(screen.getByText('Test lazy component text')).toBeInTheDocument();
		});
	});

	it('should render default Suspense custom fallback, and component after that', async () => {
		loadWithRetryMock.mockRejectedValue('Error occured');
		render(<LazyLoad {...props} fallback="Loading Component)" />);
		expect(loadWithRetryMock).toHaveBeenCalledTimes(1);
		expect(screen.getByText('Loading Component)')).toBeInTheDocument();
	});
});