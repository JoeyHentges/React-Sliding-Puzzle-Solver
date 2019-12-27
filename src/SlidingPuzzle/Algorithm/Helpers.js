const EMPTY = 0;

export function toMatrix(list) {
  var matrix = [],
    i,
    k;
  const elementsPerSubArray = Math.sqrt(list.length, 2);

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}

export function checkBoard(board, finalBoard) {
  for (let row = 0; row < board.length; row += 1) {
    for (let column = 0; column < board.length; column += 1) {
      if (board[row][column] !== finalBoard[row][column]) {
        return false;
      }
    }
  }
  return true;
}

export function getFinalBoard(boardSize) {
  const board = [];
  let current = 1;
  for (let row = 0; row < boardSize; row += 1) {
    const newRow = [];
    for (let column = 0; column < boardSize; column += 1) {
      newRow.push(current);
      current += 1;
    }
    board.push(newRow);
  }
  board[boardSize - 1][boardSize - 1] = 0;
  return board;
}

/**
 * Find the row and column holding the 0 value.
 * @param {*} board the slider board
 */
export function findOpenBox(board) {
  for (let row = 0; row < board.length; row += 1) {
    for (let column = 0; column < board.length; column += 1) {
      if (board[row][column] === 0) {
        return { row, column };
      }
    }
  }
  return null;
}

/**
 * moves the tile at the given (i,j) cordinates
 * to the current empty space (only if legal)
 * @param {*} i row index
 * @param {*} j column index
 */
export function move(board, i, j) {
  let legalFriends = getNeighbors(board, i, j);
  legalFriends.forEach(box => {
    if (box.value === EMPTY) {
      const newBoard = board;
      newBoard[box.row][box.column] = board[i][j];
      newBoard[i][j] = EMPTY;
      return newBoard;
    }
  });
  return board;
}

export function getNeighbors(board, row, column) {
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
}
