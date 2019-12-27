import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import BoardLogic from './BoardLogic';
import { solveBoard } from '../Algorithm/Solve';
import { Visualize } from '../Visualize/Visualize';

class Board extends Component {
  constructor(props) {
    super(props);
    const boardLogic = new BoardLogic(this.props.size);
    const board = boardLogic.boardToMatrix(
      boardLogic.scramble(boardLogic.board)
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
    this.state.boardLogic.newBoard(this.props.size);
    this.setState({
      board: this.state.boardLogic.matrix,
      size: this.props.size,
      moves: 0,
      isWin: this.state.boardLogic.checkWin(this.state.boardLogic.board)
    });
  };

  changeBoardSize = newSize => {
    this.state.boardLogic.newBoard(newSize);
    this.setState({
      board: this.state.boardLogic.matrix,
      size: newSize,
      moves: 0,
      isWin: this.state.boardLogic.checkWin(this.state.boardLogic.board)
    });
  };

  //note declaring class function as an arrow function gives us automatic 'this' binding.
  // in y, x
  move = (column, row) => {
    if (this.state.isWin) return;
    const newBoard = this.state.boardLogic.move(this.state.board, row, column);
    this.setState(prevState => ({
      board: newBoard,
      moves: prevState.moves + 1,
      isWin: this.state.boardLogic.checkWin(newBoard)
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
    const temp = solveBoard(this.state.boardLogic);
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
