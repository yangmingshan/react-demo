import 'normalize.css';
import './index.css';

// polyfills
// https://reactjs.org/docs/javascript-environment-requirements.html
import 'raf/polyfill';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/promise';

import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import history from './history';
import App from './app';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('app')
);
