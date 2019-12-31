/**
 * This is the node on the board.
 */
export default class Node {
  /**
   * Node Representation
   * children ([Node]) - a list of the children - boards that could be made from this board
   * parent (Node) - the board this board came from - the state before this one
   * board ([] board) - the board representation - in 1-dimentional form [1, 2, 3, 4, ..., 0]
   * columns (Integer) - the number of columns on the board
   * zeroIndex (Integer) - the 0 (blank) index
   */

  // constructor
  constructor(board, parent, moveAmount) {
    this.children = [];
    this.parent = parent;
    this.columns = Math.sqrt(board.length, 2);
    this.moveAmount = moveAmount;
    // set the board of this node - make a copy
    this.board = [];
    this.setBoard(board);
  }

  /**
   * Create a copy and set the board for this node
   * @param {*} board the board that will be set as this node's board
   */
  setBoard(board) {
    for (let i = 0; i < board.length; i += 1) {
      this.board[i] = board[i];
    }
  }

  /**
   * See if this board matches the final board
   * -- if true, the board is solved
   */
  isGoal() {
    return checkBoard(this.board);
  }

  /**
   * Copy the board values to the newBoard
   * @param {*} board board to be copied
   * @param {*} newBoard board to be copied to
   */
  copyBoard(board, newBoard) {
    for (let i = 0; i < board.length; i += 1) {
      newBoard[i] = board[i];
    }
  }

  /**
   * Don't want two of same boards, so check if two are the same
   * @param {*} checkBoard board to be checked against
   */
  isSameBoard(checkBoard) {
    for (let i = 0; i < this.board.length; i += 1) {
      if (this.board[i] !== checkBoard[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Return the index on the board containing zero
   */
  getZero() {
    for (let i = 0; i < this.board.length; i += 1) {
      if (this.board[i] === 0) {
        return i;
      }
    }
    return this.board.length;
  }

  /**
   * Find the zero on the board, and apply each legal action
   */
  expandNode() {
    this.zeroIndex = this.getZero();

    this.moveRight(this.board, this.zeroIndex);
    this.moveLeft(this.board, this.zeroIndex);
    this.moveUp(this.board, this.zeroIndex);
    this.moveDown(this.board, this.zeroIndex);
  }

  /**
   * Move the node (in 'index' position) to the right
   * @param {*} board the current board
   * @param {*} index the index being moved
   */
  moveRight(board, index) {
    if (index % this.columns < this.columns - 1) {
      let newBoard = [];
      this.copyBoard(board, newBoard);

      let temp = newBoard[index + 1];
      newBoard[index + 1] = newBoard[index];
      newBoard[index] = temp;

      let childNode = new Node(newBoard, this, 1);
      this.children.push(childNode);
    }
  }

  //Move the node (in 'index' position) to the left
  moveLeft(board, index) {
    if (index % this.columns > 0) {
      let newBoard = [];
      this.copyBoard(board, newBoard);

      let temp = newBoard[index - 1];
      newBoard[index - 1] = newBoard[index];
      newBoard[index] = temp;

      let childNode = new Node(newBoard, this, -1);
      this.children.push(childNode);
    }
  }

  //Move the node (in 'index' position) to up
  moveUp(board, index) {
    if (index - this.columns >= 0) {
      let newBoard = [];
      this.copyBoard(board, newBoard);

      let temp = newBoard[index - this.columns];
      newBoard[index - this.columns] = newBoard[index];
      newBoard[index] = temp;

      let childNode = new Node(newBoard, this, -this.columns);
      this.children.push(childNode);
    }
  }

  //Move the node (in 'index' position) down
  moveDown(board, index) {
    if (index + this.columns < board.length) {
      let newBoard = [];
      this.copyBoard(board, newBoard);

      let temp = newBoard[index + this.columns];
      newBoard[index + this.columns] = newBoard[index];
      newBoard[index] = temp;

      let childNode = new Node(newBoard, this, this.columns);
      this.children.push(childNode);
    }
  }

  /**
   * Print the board for debugging
   */
  printBoard() {
    let count = 0;
    for (let i = 0; i < this.columns; i += 1) {
      let printout = '';
      for (let j = 0; j < this.columns; j += 1) {
        printout += this.board[count] + ' ';
        count += 1;
      }
      console.log(printout);
    }
    console.log('\n');
  }
}

const checkBoard = board => {
  const finalBoard = getFinalBoard(board.length);
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== finalBoard[i]) {
      return false;
    }
  }
  return true;
};

const getFinalBoard = boardSize => {
  const board = [];
  let current = 1;
  for (let i = 0; i < boardSize - 1; i += 1) {
    board[i] = current;
    current += 1;
  }
  board[boardSize - 1] = 0;
  return board;
};
