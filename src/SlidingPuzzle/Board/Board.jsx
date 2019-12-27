import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import BoardLogic from './BoardLogic';
import { solveBoard } from '../Algorithm/Solve';
import { Visualize } from '../Visualize/Visualize';

const boardLogic = new BoardLogic();

class Board extends Component {
  static defaultProps = {
    size: 3,
    onMove: (i, j) => {
      console.log(`Clicked tile ${i},${j}`);
    }
  };

  constructor(props) {
    super(props);
    const board = boardLogic.boardToMatrix(
      boardLogic.scramble(boardLogic.initBoard(this.props.size))
    );
    this.state = {
      boardLogic,
      board,
      size: this.props.size,
      moves: 0,
      isWin: boardLogic.checkWin(board)
    };
  }

  newGame = () => {
    const boardLogic = new BoardLogic();
    const board = boardLogic.boardToMatrix(
      boardLogic.scramble(boardLogic.initBoard(this.props.size))
    );
    this.setState({
      board,
      size: this.props.size,
      moves: 0,
      isWin: boardLogic.checkWin(board)
    });
  };

  changeBoardSize = newSize => {
    const boardLogic = new BoardLogic();
    const board = boardLogic.boardToMatrix(
      boardLogic.scramble(boardLogic.initBoard(newSize))
    );
    this.setState({
      board,
      size: newSize,
      moves: 0,
      isWin: boardLogic.checkWin(board)
    });
  };

  //note declaring class function as an arrow function gives us automatic 'this' binding.
  // in y, x
  move = (column, row) => {
    if (this.state.isWin) return;
    console.log(column, row);
    this.props.onMove(row, column);
    const newBoard = boardLogic.move(this.state.board, row, column);
    this.setState(prevState => ({
      board: newBoard,
      moves: prevState.moves + 1,
      isWin: boardLogic.checkWin(newBoard)
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
    const { moves } = solveBoard(this.state.board);
    Visualize(this, moves);
  };

  changeSize = amount => {
    const newSize = this.state.size + amount;
    if (newSize > 2 && newSize < 11)
      this.changeBoardSize(this.state.size + amount);
  };

  render() {
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
