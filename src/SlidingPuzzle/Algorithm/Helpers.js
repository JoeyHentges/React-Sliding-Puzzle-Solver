const EMPTY = 0;

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
export function move(board, row, column) {
  let legalFriends = getNeighbors(board, row, column);
  for (let i = 0; i < legalFriends.length; i += 1) {
    const box = legalFriends[i];
    if (box.value === EMPTY) {
      return moveHelper(board, box, row, column);
    }
  }
  return board;
}

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
