import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { store } from './app';

ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <Provider store={ store }>
            <App/>
        </Provider>
    );
