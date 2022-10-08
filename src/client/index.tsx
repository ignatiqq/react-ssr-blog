import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

import './styles/index.scss';
import App from './App';

const dehydratedState = (window as any).__REACT_QUERY_STATE__;
export const queryClient = new QueryClient();

const container = document.getElementById('root') as HTMLElement;

hydrateRoot(
    container, 
    <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
            <App />
        </Hydrate> 
    </QueryClientProvider>
);