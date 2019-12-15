import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './home/home';
import 'antd/dist/antd.less';

/**
 * @file 控制台 app
 */

function render(App) {
  ReactDOM.render(<App />, document.getElementById('app'));
}

render(Home);

if (module.hot) {
  module.hot.accept(function() {
    const Home = require('./home/home').default;
    render(Home);
  });
}