import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import routes from './routes';
import NotFound from './pages/not-found';

import './app.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map((route, i) => <Route key={i} exact={!!route.exact} path={route.path} component={route.component} />)}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(App);
