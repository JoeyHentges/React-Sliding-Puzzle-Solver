import React, { Component } from 'react';
import './App.css';
import Puzzle from './Puzzle';

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
          <Puzzle size={size} />
        </header>
      </div>
    );
  }
}

export default App;
