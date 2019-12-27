import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import BoardLogic from './BoardLogic';
import { solveBoard } from '../Algorithm/Solve';
class Board extends Component {
  static defaultProps = {
    size: 3,
    onMove: (i, j) => {
      console.log(`Clicked tile ${i},${j}`);
    }
  };

  constructor(props) {
    super(props);
    this.state = this.initialGameState();
  }

  initialGameState = () => {
    this.boardLogic = new BoardLogic(this.props.data || this.props.size);
    return {
      board: this.props.data
        ? this.boardLogic.matrix
        : this.boardLogic.scramble(),
      size: this.props.size,
      moves: 0,
      isWin: this.boardLogic.checkWin()
    };
  };

  changeBoardSize = newSize => {
    this.boardLogic = new BoardLogic(this.props.data || newSize);
    this.setState({
      board: this.props.data
        ? this.boardLogic.matrix
        : this.boardLogic.scramble(),
      size: newSize,
      moves: 0,
      isWin: this.boardLogic.checkWin()
    });
  };

  //note declaring class function as an arrow function gives us automatic 'this' binding.
  // in y, x
  move = (i, j) => {
    if (this.state.isWin) return;

    if (this.boardLogic.move(i, j)) {
      this.props.onMove(i, j);
      this.setState(prevState => ({
        board: this.boardLogic.matrix,
        moves: prevState.moves + 1,
        isWin: this.boardLogic.checkWin()
      }));
    }
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

  newGame = () => {
    this.setState(this.initialGameState());
  };

  solve = () => {
    //this.move(2 - 1, 3 - 1);
    solveBoard(this.state.board);
  };

  changeSize = amount => {
    const newSize = this.state.size + amount;
    if (newSize > 2 && newSize < 10)
      this.changeBoardSize(this.state.size + amount);
  };

  render() {
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
