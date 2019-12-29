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
