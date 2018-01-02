// polyfills
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/promise';
import 'core-js/fn/object/assign';
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/includes';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/starts-with';
import 'core-js/fn/string/ends-with';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import store from './store';
import history from './history';
import App from './app';

const render = () => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <Router history={history}>
          <Route component={App} />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render();

if (module.hot) {
  module.hot.accept('./app', render);
}
