import React from "react";

export default class DevErrorBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, err };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container card">
          <h1>Something broke</h1>
          <pre>{String(this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
