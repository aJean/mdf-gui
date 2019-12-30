import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, MemoryRouter, Redirect } from 'react-router';
import store from './home/store';
import Home from './home/home';
import 'antd/dist/antd.less';

/**
 * @file memory router from electron
 */

export default function() {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Route exact path='/' component={Home} />
        {/* <Redirect to="/" /> */}
      </MemoryRouter>
    </Provider>
  );
}
