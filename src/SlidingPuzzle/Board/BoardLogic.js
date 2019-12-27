import {
  getFinalBoard,
  move,
  getNeighbors,
  findOpenBox,
  checkBoard
} from '../Algorithm/Helpers';

const EMPTY = 0;
Array.prototype.swap = function(i, j) {
  // eslint-disable-line no-extend-native
  [this[i], this[j]] = [this[j], this[i]];
  return this;
};

export default class BoardLogic {
  /**
   * Gets a new board of the given size
   * @param {Number} size amount of Boxes per row
   */
  initBoard(size) {
    return Array.from({ length: size * size }, (_, b) => b);
  }

  boardToMatrix(board) {
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
    let last = board.length - 1;
    return !!board.reduce(
      (res, cur, i) => res && (cur === i + 1 || i === last)
    );
  }

  /**
   * Scrambles the board randomly in a solvable way.
   */
  scramble(board) {
    return board.sort(() => Math.random() - 0.5);
  }

  /**
   * Gets all existing tiles around a given tile (i,j)
   * @param {Number} i
   * @param {Number} j
   */
  getLegalFriends(board, i, j) {
    const size = Math.sqrt(board.length, 2);
    let friends = [
      { i: i + 1, j },
      { i: i - 1, j },
      { i, j: j + 1 },
      { i, j: j - 1 }
    ];
    // ES6 feature :  Arrow functions + Destructing assignment
    let isLegal = ({ i, j }) => i < size && i >= 0 && j < size && j >= 0;
    return friends.filter(isLegal);
  }
}
