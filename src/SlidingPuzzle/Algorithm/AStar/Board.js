class Board {
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

  // check if the board was solved
  solved() {
    let n = this.width * this.width;
    let flatBoard = [];
    for (let i = 0; i < this.width; i++) {
      flatBoard = flatBoard.concat(this.board[i]);
    }
    for (let i = 1; i < n; i += 1) {
      if (i === n) {
        if (flatBoard[i - 1] !== 0) {
          return false;
        }
      } else {
        if (flatBoard[i - 1] !== i) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Return a list of move, action pairs.
   * Moves can be called to return a new board that
   * result in sliding the 0 tile int he direction of the action
   */
  actions() {
    function createMove() {
      return this.move(at, to);
    }

    const moves = [];
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        // all of the directions a move to make
        // returns what the row and column are that it would move to
        const directions = {
          R: (i, j) => {
            return { i, j: j - 1 };
          },
          L: (i, j) => {
            return { i, j: j + 1 };
          },
          U: (i, j) => {
            return { i: i - 1, j };
          },
          D: (i, j) => {
            return { i: i + 1, j };
          }
        };

        const directEntries = Object.entries(directions);
        for (let k = 0; k < directEntries.length; k += 1) {
          const key = directEntries[k][0];
          const value = directEntries[k][1];
          const to = value(i, j);
          if (
            to.i >= 0 &&
            to.j >= 0 &&
            to.i < this.width &&
            to.j < this.width &&
            this.board[to.i][to.j] === 0
          ) {
            const newBoard = createMove({ i, j }, { i: to.i, j: to.j });
            moves.append({ board: newBoard, action: key });
          }
        }
      }
    }
    return moves;
  }

  // make a copy of the board
  copy() {
    const newBoard = [];
    for (let i = 0; i < this.board.length; i += 1) {
      newBoard[i] = this.board[i];
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

  manhattan() {
    let distance = 0;
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        if (this.board[i][j] !== 0) {
          // divmod (python)
          const x = Math.floor((this.board[i][j] - 1) / this.width);
          const y = (this.board[i][j] - 1) % this.width;
          distance += Math.abs(x - i) + Math.abs(y - j);
        }
      }
    }
    return distance;
  }
}
