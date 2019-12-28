import { getNeighbors } from '../Algorithm/Helpers';

const EMPTY = 0;

export default class Board {
  constructor(size) {
    const board = this.getNewBoard(size);
    this.board = board;
    this.matrix = boardToMatrix(board);
    this.size = size;
  }

  /**
   * Return a copy of the board
   */
  getBoard() {
    return this.board.slice(0);
  }

  /**
   * Return a copy of the matrix
   */
  getMatrix() {
    return this.matrix;
  }

  getNewBoard(size) {
    return scramble(Array.from({ length: size * size }, (_, b) => b));
  }

  makeMove(row, column) {
    const newBoard = move(this.getMatrix(), row, column);
    this.board = matrixToBoard(newBoard);
    this.matrix = newBoard;
  }
}

/**
 * Scrambles the board randomly in a solvable way.
 */
const scramble = board => {
  return board.sort(() => Math.random() - 0.5);
};

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

const matrixToBoard = matrix => {
  const board = [];
  let count = 0;
  for (let row = 0; row < matrix.length; row += 1) {
    for (let column = 0; column < matrix.length; column += 1) {
      board.push(matrix[count]);
      count += 1;
    }
  }
  return board;
};

/**
 * moves the tile at the given (i,j) cordinates
 * to the current empty space (only if legal)
 * @param {*} i row index
 * @param {*} j column index
 */
const move = (board, row, column) => {
  let legalFriends = getNeighbors(board, row, column);
  for (let i = 0; i < legalFriends.length; i += 1) {
    const box = legalFriends[i];
    if (box.value === EMPTY) {
      return moveHelper(board, box, row, column);
    }
  }
  return board;
};

const moveHelper = (board, zero, row, column) => {
  const newBoard = [];
  for (let i = 0; i < board.length; i += 1) {
    const newRow = [];
    for (let j = 0; j < board.length; j += 1) {
      newRow.push(board[i][j]);
    }
    newBoard.push(newRow);
  }
  newBoard[zero.row][zero.column] = newBoard[row][column];
  newBoard[row][column] = EMPTY;
  return newBoard;
};
