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
      isWin: checkBoard(board.getMatrix(), getFinalBoard(board.size)),
      //animation true false - slows algorithm solving if true
      animation: false,
      animationSpeed: 10, // only matters if flase - if true, animation speed it fixed
      animationActive: false
    };
  }

  newGame = () => {
    if (this.state.animationActive) return;
    const board = new Board(this.props.size);
    this.setState({
      board,
      moves: 0,
      isWin: checkBoard(board.getMatrix(), getFinalBoard(board.size))
    });
  };

  changeBoardSize = amount => {
    if (this.state.animationActive) return;
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
  move = (column, row, clickType) => {
    if (clickType === 'manual' && this.state.animationActive) return;
    if (this.state.isWin) return;

    const newMoveInfo = this.state.board.makeMove(row, column);
    if (newMoveInfo.newRow !== null) {
      this.state.board.setBoard(newMoveInfo.board);
      this.setState(prevState => ({
        moves: prevState.moves + 1,
        isWin: checkBoard(
          this.state.board.getMatrix(),
          getFinalBoard(this.state.board.size)
        )
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
          <Box
            key={bNum}
            boxNumber={bNum}
            row={j}
            column={i}
            onClick={() => this.move(i, j, 'manual')}
          />
        ))}
      </div>
    );
  };

  solve = algorithm => {
    if (this.state.animationActive) return;
    this.setState({ animationActive: true });
    const boardCopy = this.state.board.getBoard();
    Run(this, boardCopy, algorithm);
  };

  render() {
    let rows = this.state.board.getMatrix().map(this.getRow);
    let message =
      (this.state.isWin ? 'Winner !!! ' : 'Total ') +
      `Moves: ${this.state.moves
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    return (
      <>
        Slider Puzzle Solver {this.state.board.size}x{this.state.board.size}
        <div className="slider-board">
          {rows}
          <span className="slider-msg">{message}</span>
          <div className="btn-new-game">
            <button onClick={this.newGame}>New Game</button>
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
          <span className="slider-msg-2">
            Solve Speed: {10000 - this.state.animationSpeed + 10}
          </span>
          <div>
            <button
              className="speed-change-btn"
              onClick={() => {
                this.setState(prevState => ({
                  animationSpeed:
                    prevState.animationSpeed >= 100
                      ? prevState.animationSpeed < 10000
                        ? prevState.animationSpeed + 100
                        : prevState.animationSpeed
                      : prevState.animationSpeed + 10
                }));
              }}
            >
              Decrease
            </button>
            <button
              className="speed-change-btn"
              onClick={() => {
                this.setState(prevState => ({
                  animation: !prevState.animation
                }));
              }}
            >
              Animation Active: {this.state.animation.toString().toUpperCase()}
            </button>
            <button
              className="speed-change-btn"
              onClick={() => {
                this.setState(prevState => ({
                  animationSpeed:
                    prevState.animationSpeed > 100
                      ? prevState.animationSpeed - 100
                      : prevState.animationSpeed > 10
                      ? prevState.animationSpeed - 10
                      : 10
                }));
              }}
            >
              Increase
            </button>
          </div>
          <div className="btn-new-game smaller">
            <button onClick={() => this.solve('BruteForce')}>
              Brute Force
            </button>
            <button onClick={() => this.solve('BreadthFirstSearch')}>
              Breadth First Search
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Puzzle;
