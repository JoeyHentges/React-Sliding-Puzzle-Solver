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
    //return [1, 2, 3, 4, 0, 5, 7, 8, 6];
    //return [1, 6, 2, 4, 9, 5, 3, 7, 0, 10, 11, 8, 13, 14, 15, 12];
    return scramble(Array.from({ length: size * size }, (_, b) => b));
  }

  makeMove(newRow, newColumn) {
    return move(this.getMatrix(), newRow, newColumn);
  }

  setBoard(matrix) {
    this.board = matrixToBoard(matrix);
    this.matrix = matrix;
  }

  changeBoardSize(newSize) {
    const board = this.getNewBoard(newSize);
    this.board = board;
    this.matrix = boardToMatrix(board);
    this.size = newSize;
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
