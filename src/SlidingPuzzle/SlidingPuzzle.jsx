import React, { Component } from 'react';

import './SlidingPuzzle.css';
import App from './Board/App';

export default class SlidingPizzle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="board">
        <App size={4} solve={this.solve}></App>
      </div>
    );
  }
}
