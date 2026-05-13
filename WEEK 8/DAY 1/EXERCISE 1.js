import React, { Component } from 'react';

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }
    return (
      <h1 onClick={this.handleClick}>
        {this.state.counter}
      </h1>
    );
  }
}

export default BuggyCounter;
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
import React from 'react';
import BuggyCounter from './BuggyCounter';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div>
      <p><b>Simulation 1:</b> Two counters in one boundary. If one crashes, both disappear.</p>
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />

      <p><b>Simulation 2:</b> Each counter in its own boundary. One crash doesn't affect the other.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <hr />

      <p><b>Simulation 3:</b> No boundary. A crash breaks the entire app.</p>
      <BuggyCounter />
    </div>
  );
}

export default App;
import React, { Component } from 'react';

class Child extends Component {
  componentWillUnmount() {
    alert("The component is about to be unmounted!");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

class LifeCycleApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red",
      show: true
    };
  }

  // Part II: Timer logic
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  // Part I: shouldComponentUpdate
  shouldComponentUpdate() {
    // Set to false to prevent the UI from updating to "blue"
    return true; 
  }

  // Part III: getSnapshotBeforeUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  // Part II: componentDidUpdate
  componentDidUpdate() {
    console.log("after update");
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  handleDelete = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>My Favorite Color is <i>{this.state.favoriteColor}</i></h1>
        <button onClick={this.changeColor}>Change Color</button>
        
        <hr />
        
        {this.state.show && <Child />}
        <button onClick={this.handleDelete}>Delete Header</button>
      </div>
    );
  }
}

export default LifeCycleApp;
