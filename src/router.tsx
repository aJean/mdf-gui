import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, MemoryRouter, Redirect } from 'react-router';
import store from './home/store';
import Launch from './Launch/launch';
import Home from './home/home';
import 'antd/dist/antd.less';

/**
 * @file memory router from electron
 */

export default function() {
  const project = window['project'];

  return (
    <Provider store={store}>
      <MemoryRouter>
        <Route exact path='/' component={Launch} />
        <Route path='/app' component={Home} />
        { project && project.path ? <Redirect to="/app" /> : null}
      </MemoryRouter>
    </Provider>
  );
}
