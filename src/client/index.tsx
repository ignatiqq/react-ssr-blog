import React from 'react';
import { hydrate, render } from 'react-dom';

import App from './App';

hydrate(
    <App />,
    document.getElementById('root')
)