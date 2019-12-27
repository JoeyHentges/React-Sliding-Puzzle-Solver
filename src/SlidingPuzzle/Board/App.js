import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { size } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <Board size={size} />
        </header>
      </div>
    );
  }
}

export default App;
