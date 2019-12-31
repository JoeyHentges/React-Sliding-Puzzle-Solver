export function checkBoard(board, finalBoard) {
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== finalBoard[i]) {
      return false;
    }
  }
  return true;
}

export function getFinalBoard(boardSize) {
  const board = [];
  let current = 1;
  for (let i = 0; i < boardSize - 1; i += 1) {
    board[i] = current;
    current += 1;
  }
  board[boardSize - 1] = 0;
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
