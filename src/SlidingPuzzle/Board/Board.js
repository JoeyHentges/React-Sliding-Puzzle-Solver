const EMPTY = 0;
Array.prototype.swap = function(i, j) {
  // eslint-disable-line no-extend-native
  [this[i], this[j]] = [this[j], this[i]];
  return this;
};

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
    //return [1, 2, 3, 4, 0, 5, 7, 8, 6];
    return scramble(Array.from({ length: size * size }, (_, b) => b));
  }

  makeMove(newRow, newColumn) {
    return move(this.getMatrix(), newRow, newColumn);
  }

  setBoard(matrix) {
    this.board = matrixToBoard(matrix);
    this.matrix = matrix;
  }
}

/**
 * Scrambles the board randomly in a solvable way.
 */
const scramble = board => {
  const size = Math.sqrt(board.length, 2);
  const SCRAMBLE_FACTOR = board.length * 10;
  let rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
  let emptyIdx = board.indexOf(EMPTY);
  let [i, j] = [emptyIdx % size, Math.floor(emptyIdx / size)];
  let b2c = ({ i, j }) => size * j + i;

  for (let ind = 0; ind < SCRAMBLE_FACTOR; ++ind) {
    let legalFriends = getLegalFriends(i, j, size);
    let friend = legalFriends[rand(0, legalFriends.length)];
    board.swap(b2c(friend), b2c({ i, j }));
    ({ i, j } = friend);
  }
  return board;
};

/**
 * Gets all existing tiles around a given tile (i,j)
 * @param {Number} i
 * @param {Number} j
 */
const getLegalFriends = (i, j, size) => {
  let friends = [
    { i: i + 1, j },
    { i: i - 1, j },
    { i, j: j + 1 },
    { i, j: j - 1 }
  ];
  // ES6 feature :  Arrow functions + Destructing assignment
  let isLegal = ({ i, j }) => i < size && i >= 0 && j < size && j >= 0;
  return friends.filter(isLegal);
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
      board.push(matrix[row][column]);
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
      return {
        board: moveHelper(board, box, row, column),
        row: box.row,
        column: box.column
      };
    }
  }
  return {
    board,
    newRow: null,
    newColumn: null
  };
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

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  if (board[row - 1] !== undefined && board[row - 1][column] !== undefined)
    neighbors.push({
      value: board[row - 1][column],
      row: row - 1,
      column: column
    });

  if (board[row + 1] !== undefined && board[row + 1][column] !== undefined)
    neighbors.push({
      value: board[row + 1][column],
      row: row + 1,
      column: column
    });

  if (board[row][column - 1] !== undefined)
    neighbors.push({
      value: board[row][column - 1],
      row: row,
      column: column - 1
    });

  if (board[row][column + 1] !== undefined)
    neighbors.push({
      value: board[row][column + 1],
      row: row,
      column: column + 1
    });

  return neighbors;
};
