import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './home/store';
import Home from './home/home';
import 'antd/dist/antd.less';

/**
 * @file 控制台 app
 */

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}

render(Home);

if (module.hot) {
  // app.tsx 需要 accept
  module.hot.accept(function() {
    const Home = require('./home/home').default;
    render(Home);
  });
}
