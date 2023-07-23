import { Component, ErrorInfo, ReactNode } from "react";
import styles from "./error-boundar.module.css";

type props = {
  children?: ReactNode;
};

type state = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Render an error message or a fallback UI
      return (
        <div className={styles.root}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>{this.state.errorInfo?.componentStack}</p>
        </div>
      );
    }

    return this.props.children; // Render the children components as usual
  }
}

export default ErrorBoundary;
