import * as React from 'react';
import './boundary.less';

/**
 * @file 错误边界
 */

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, e: null };

  static getDerivedStateFromError(e: any) {
    return { hasError: true, e };
  }

  render() {
    const { children } = this.props;
    const { hasError, e } = this.state;

    return hasError ? (
      <div className='mf-error'>
        <h1>app exception</h1>
        <p>{e.message}</p>
      </div>
    ) : (
      children
    );
  }
}
