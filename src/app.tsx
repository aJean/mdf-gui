import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './router';

/**
 * @file 控制台 app
 */

function render(App) {
  ReactDOM.render(<App />, document.getElementById('app'));
}

render(App);

if (module.hot) {
  // app.tsx 需要 accept
  module.hot.accept(function() {
    const App = require('./router').default;
    render(App);
  });
}
