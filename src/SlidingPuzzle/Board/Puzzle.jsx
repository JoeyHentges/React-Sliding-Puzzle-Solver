import React, { Component } from 'react';
import Box from './Box';
import { Run } from '../Algorithm/Algorithms';
import { checkBoard, getFinalBoard } from '../Algorithm/Helpers';
import Board from './Board';

class Puzzle extends Component {
  constructor(props) {
    super(props);
    const board = new Board(this.props.size);
    this.state = {
      board,
      moves: 0,
      isWin: checkBoard(board.getMatrix(), getFinalBoard(board.size))
    };
  }

  newGame = () => {
    const board = new Board(this.props.size);
    this.setState({
      board,
      moves: 0,
      isWin: checkBoard(board.getMatrix(), getFinalBoard(board.size))
    });
  };

  changeBoardSize = amount => {
    const newSize = this.state.board.size + amount;
    if (newSize < 3 || newSize > 10) return;
    const board = new Board(newSize);
    this.setState({
      board,
      moves: 0,
      isWin: checkBoard(board.getMatrix(), getFinalBoard(board.size))
    });
  };

  //note declaring class function as an arrow function gives us automatic 'this' binding.
  // in y, x
  move = (column, row) => {
    if (this.state.isWin) return;
    this.state.board.makeMove(row, column);
    this.setState(prevState => ({
      moves: prevState.moves + 1,
      isWin: checkBoard(
        this.state.board.getMatrix(),
        getFinalBoard(this.state.board.size)
      )
    }));
  };

  /**
   * returns a single slider row given the row data
   * @param {Object} rowData row data
   * @param {Number} i row number
   */
  getRow = (rowData, j) => {
    return (
      <div key={j}>
        {rowData.map((bNum, i) => (
          <Box key={bNum} boxNumber={bNum} onClick={() => this.move(i, j)} />
        ))}
      </div>
    );
  };

  solve = () => {
    const boardCopy = this.state.board.getMatrix();
    Run(this, boardCopy, 'BruteForce');
  };

  render() {
    let rows = this.state.board.getMatrix().map(this.getRow);
    let message =
      (this.state.isWin ? 'Winner !!! ' : 'Total ') +
      `Moves: ${this.state.moves}`;

    return (
      <>
        Slider Puzzle Solver {this.state.board.size}x{this.state.board.size}
        <div className="slider-board">
          {rows}
          <span className="slider-msg">{message}</span>
          <div className="btn-new-game">
            <button onClick={this.newGame}>New Game</button>
            <button onClick={this.solve}>Solve</button>
            <button
              onClick={() => {
                this.changeBoardSize(1);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                this.changeBoardSize(-1);
              }}
            >
              -
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Puzzle;
