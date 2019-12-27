import { getFinalBoard, move, checkBoard } from '../Algorithm/Helpers';

export default class BoardLogic {
  constructor(size) {
    const board = this.scramble(this.initBoard(size));
    this.board = board;
    this.matrix = this.boardToMatrix(board);
  }

  /**
   * Gets a new board of the given size
   * @param {Number} size amount of Boxes per row
   */
  initBoard(size) {
    return Array.from({ length: size * size }, (_, b) => b);
  }

  newBoard(size) {
    const board = this.scramble(this.initBoard(size));
    this.board = board;
    this.matrix = this.boardToMatrix(board);
  }

  boardToMatrix() {
    //const size = Math.sqrt(this.board.size, 2);
    const board = this.board;
    console.log(board);
    //return this.board;

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
  }

  /**
   * moves the tile at the given (i,j) cordinates
   * to the current empty space (only if legal)
   * @param {*} i row index
   * @param {*} j column index
   */
  move(board, i, j) {
    return move(board, i, j);
  }

  /**
   * Checks if board is in win configuration.
   */
  checkWin(board) {
    return checkBoard(board, getFinalBoard(board.length));
  }

  /**
   * Scrambles the board randomly in a solvable way.
   */
  scramble(board) {
    return board.sort(() => Math.random() - 0.5);
  }
}
