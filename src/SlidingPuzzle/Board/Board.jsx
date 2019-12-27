import React, { Component } from 'react';
import Box from './Box';
import { solveBoard } from '../Algorithm/Solve';
import { Visualize } from '../Visualize/Visualize';
import { move, checkBoard, getFinalBoard } from '../Algorithm/Helpers';

class Board extends Component {
  constructor(props) {
    super(props);
    const newBoard = Array.from(
      { length: this.props.size * this.props.size },
      (_, b) => b
    );
    const newBoardMatrix = boardToMatrix(newBoard);
    this.state = {
      board: newBoardMatrix,
      size: this.props.size,
      moves: 0,
      isWin: checkBoard(newBoard, getFinalBoard(newBoard.length))
    };
  }

  newGame = () => {
    const newBoard = Array.from(
      { length: this.props.size * this.props.size },
      (_, b) => b
    );
    const newBoardMatrix = boardToMatrix(newBoard);
    this.setState({
      board: newBoardMatrix,
      size: this.props.size,
      moves: 0,
      isWin: checkBoard(newBoard, getFinalBoard(newBoard.length))
    });
  };

  changeBoardSize = newSize => {
    const newBoard = Array.from({ length: newSize * newSize }, (_, b) => b);
    const newBoardMatrix = boardToMatrix(newBoard);
    this.setState({
      board: newBoardMatrix,
      size: newSize,
      moves: 0,
      isWin: checkBoard(newBoard, getFinalBoard(newBoard.length))
    });
  };

  //note declaring class function as an arrow function gives us automatic 'this' binding.
  // in y, x
  move = (column, row) => {
    if (this.state.isWin) return;
    const newBoard = move(this.state.board, row, column);
    this.setState(prevState => ({
      board: newBoard,
      moves: prevState.moves + 1,
      isWin: checkBoard(newBoard, getFinalBoard(newBoard.length))
    }));
  };

  /**
   * returns a single slider row given the row data
   * @param {Object} rowData row data
   * @param {Number} i row number
   */
  getRows = () => {
    const board = this.state.board;
    const j = 0;
    return (
      <div key={j}>
        {board.map((bNum, i) => (
          <Box key={bNum} boxNumber={bNum} onClick={() => this.move(i, j)} />
        ))}
      </div>
    );
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
    const temp = solveBoard(this.state.board);
    console.log(temp);
    //const { moves } = solveBoard(this.state.boardLogic.board);
    //Visualize(this, moves);
  };

  changeSize = amount => {
    const newSize = this.state.size + amount;
    if (newSize > 2 && newSize < 11)
      this.changeBoardSize(this.state.size + amount);
  };

  render() {
    console.log(this.state);
    let rows = this.state.board.map(this.getRow);
    let message =
      (this.state.isWin ? 'Winner !!! ' : 'Total ') +
      `Moves: ${this.state.moves}`;

    return (
      <>
        Slider Puzzle Solver {this.state.size}x{this.state.size}
        <div className="slider-board">
          {rows}
          <span className="slider-msg">{message}</span>
          <div className="btn-new-game">
            <button onClick={this.newGame}>New Game</button>
            <button onClick={this.solve}>Solve</button>
            <button
              onClick={() => {
                this.changeSize(1);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                this.changeSize(-1);
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

export default Board;

const boardToMatrix = board => {
  const rowColLength = Math.sqrt(board.length, 2);
  const matrix = [];
  let count = 0;
  for (let row = 0; row < rowColLength; row += 1) {
    const currRow = [];
    for (let column = 0; column < rowColLength; column += 1) {
      currRow.push(board[count]);
      count += 1;
    }
    matrix.push(currRow);
  }
  return matrix;
};
