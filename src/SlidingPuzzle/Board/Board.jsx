import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import BoardLogic from './BoardLogic';
import { solveBoard } from '../Algorithm/Solve';

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
    const { board, moves, numberMoves } = solveBoard(this.state.board);
    this.setState(prevState => ({
      board: board,
      moves: prevState.moves + numberMoves,
      isWin: boardLogic.checkWin(board)
    }));
  };

  changeSize = amount => {
    const newSize = this.state.size + amount;
    if (newSize > 2 && newSize < 10)
      this.changeBoardSize(this.state.size + amount);
  };

  render() {
    //let rows = this.getRows();
    //console.log(rows);
    let rows = this.state.board.map(this.getRow);
    let message =
      (this.state.isWin ? 'Winner !!! ' : 'Total ') +
      `Moves: ${this.state.moves}`;

    return (
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
    );
  }
}

Board.propTypes = {
  data: PropTypes.array,
  size: PropTypes.number,
  onMove: PropTypes.func
};

export default Board;
