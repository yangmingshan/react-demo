import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { hot } from 'react-hot-loader/root';
import routes from './routes';
import NotFound from './pages/not-found';
import Loading from './components/loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            exact={!!route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default hot(connect(mapStateToProps)(App));
