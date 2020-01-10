import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, MemoryRouter, Redirect } from 'react-router';
import store from './data/store';
import WebIDE from './ide/ide';
import ErrorBroundary from './component/boundary';
import 'antd/dist/antd.less';

/**
 * @file memory router from electron
 */

export default function() {
  return (
    <ErrorBroundary>
      <Provider store={store}>
        <MemoryRouter>
          <Route exact path='/' component={WebIDE} />
          {/* <Redirect to="/" /> */}
        </MemoryRouter>
      </Provider>
    </ErrorBroundary>
  );
}
