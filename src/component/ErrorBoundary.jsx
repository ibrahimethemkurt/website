import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorStr: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorStr: error.toString() + "\n" + error.stack };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-[9999] bg-red-900 text-white p-8 overflow-auto font-mono text-xs">
          <h1>React Error Boundary Caught:</h1>
          <pre>{this.state.errorStr}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
