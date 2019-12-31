export default class Board {
  /**
   *
   * @param {*} board the board is a 2d list with int entries
   * [
   *  [1, 2, 3],
   *  [4, 5, 6],
   *  [7, 8, 0]
   * ]
   */
  constructor(board) {
    this.width = board.length;
    this.board = board;
  }

  /**
   * Get the solved board, but in flattened form
   * [[][][]] => []
   */
  getSolvedBoard() {
    const solvedBoard = [];
    const total = this.width * this.width;
    for (let i = 0; i < total; i += 1) {
      if (i === total - 1) {
        solvedBoard.push(0);
      } else {
        solvedBoard.push(i + 1);
      }
    }
    return solvedBoard;
  }

  // check if the board was solved
  solved() {
    return this.board.toString() === this.getSolvedBoard().toString();
  }

  /**
   * Return a list of move, action pairs.
   * Moves can be called to return a new board that
   * result in sliding the 0 tile int he direction of the action
   */
  actions() {
    const moves = [];
    const zeroPos = this.getZero();
    // all of the directions a move to make
    // returns what the row and column are that it would move to
    const directions = {
      R: zeroPos => {
        return this.moveRight(zeroPos);
      },
      L: zeroPos => {
        return this.moveLeft(zeroPos);
      },
      U: zeroPos => {
        return this.moveUp(zeroPos);
      },
      D: zeroPos => {
        return this.moveDown(zeroPos);
      }
    };

    const directEntries = Object.entries(directions);
    for (let k = 0; k < directEntries.length; k += 1) {
      const key = directEntries[k][0];
      const value = directEntries[k][1];
      const newMove = value(zeroPos);
      if (newMove !== null) {
        //const newBoard = createMove({ i, j }, { i: to.i, j: to.j });
        //const newBoard = this.move();
        moves.push({ board: newMove, action: key });
      }
    }

    return moves;
  }

  /**
   * Find the row and column holding the 0 value.
   */
  getZero() {
    const board = this.board;
    for (let row = 0; row < this.width; row += 1) {
      for (let column = 0; column < this.width; column += 1) {
        if (board[row][column] === 0) {
          return { row, column };
        }
      }
    }
    return null;
  }

  // make a copy of the board
  copy() {
    const newBoard = [];
    for (let i = 0; i < this.width; i += 1) {
      const newRow = [];
      for (let j = 0; j < this.width; j += 1) {
        newRow.push(this.board[i][j]);
      }
      newBoard.push(newRow);
    }
    return new Board(newBoard);
  }

  move(at, to) {
    const copy = this.copy();
    let temp = copy.board[at.i][at.j];
    copy.board[at.i][at.j] = copy.board[to.i][to.j];
    copy.board[to.i][to.j] = temp;
    return copy;
  }

  // count the number of misplaced tiles
  manhattan() {
    let curr = 0; // the current index in the solved board
    let count = 0; // the count of misplaced tiles
    const solvedBoard = this.getSolvedBoard();
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        if (this.board[i][j] !== solvedBoard[curr]) {
          count += 1;
        }
        curr += 1;
      }
    }
    return count;
  }

  /**
   * Move the node (in 'index' position) to the right
   * @param {*} board the current board
   * @param {*} index the index being moved
   */
  moveRight(zeroPos) {
    if (this.board[zeroPos.row][zeroPos.column + 1] !== undefined) {
      const newBoard = this.copy();

      let temp = newBoard.board[zeroPos.row][zeroPos.column + 1];
      newBoard.board[zeroPos.row][zeroPos.column + 1] =
        newBoard.board[zeroPos.row][zeroPos.column];
      newBoard.board[zeroPos.row][zeroPos.column] = temp;

      return newBoard;
    }
    return null;
  }

  //Move the node (in 'index' position) to the left
  moveLeft(zeroPos) {
    if (this.board[zeroPos.row][zeroPos.column - 1] !== undefined) {
      const newBoard = this.copy();

      let temp = newBoard.board[zeroPos.row][zeroPos.column - 1];
      newBoard.board[zeroPos.row][zeroPos.column - 1] =
        newBoard.board[zeroPos.row][zeroPos.column];
      newBoard.board[zeroPos.row][zeroPos.column] = temp;

      return newBoard;
    }
    return null;
  }

  //Move the node (in 'index' position) to up
  moveUp(zeroPos) {
    if (
      this.board[zeroPos.row - 1] !== undefined &&
      this.board[zeroPos.row - 1][zeroPos.column] !== undefined
    ) {
      const newBoard = this.copy();

      let temp = newBoard.board[zeroPos.row - 1][zeroPos.column];
      newBoard.board[zeroPos.row - 1][zeroPos.column] =
        newBoard.board[zeroPos.row][zeroPos.column];
      newBoard.board[zeroPos.row][zeroPos.column] = temp;

      return newBoard;
    }
    return null;
  }

  //Move the node (in 'index' position) down
  moveDown(zeroPos) {
    if (
      this.board[zeroPos.row + 1] !== undefined &&
      this.board[zeroPos.row + 1][zeroPos.column] !== undefined
    ) {
      const newBoard = this.copy();

      let temp = newBoard.board[zeroPos.row + 1][zeroPos.column];
      newBoard.board[zeroPos.row + 1][zeroPos.column] =
        newBoard.board[zeroPos.row][zeroPos.column];
      newBoard.board[zeroPos.row][zeroPos.column] = temp;

      return newBoard;
    }
    return null;
  }
}
