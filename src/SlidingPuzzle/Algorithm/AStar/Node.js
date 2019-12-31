/**
 * This is the node on the board.
 */
export default class Node {
  /**
   *
   * @param {*} board the current board of the node
   * @param {*} parent the parent node of this node - what board proceeded this
   * @param {*} action what the action was to make this board
   */
  constructor(board, parent, action) {
    this.board = board;
    this.parent = parent;
    this.action = action;
    if (this.parent !== undefined) {
      this.G = parent.G + 1;
    } else {
      this.G = 0;
    }
  }

  // return a hashable representation of the node (this)
  state() {
    return this.board.board.toString();
  }

  // reconstruct a path from this node to the root (parent) node
  path() {
    let node = this;
    let path = [];
    while (node !== undefined) {
      path.unshift(node);
      node = node.parent;
    }

    return path;
  }

  // check if the board is solved
  solved() {
    return this.board.solved();
  }

  // accessible actions at the current state
  actions() {
    return this.board.actions();
  }

  // get the number of misplaced tiles in the board
  H() {
    return this.board.manhattan();
  }

  F() {
    return this.H() + this.G;
  }

  toString() {
    return this.board;
  }
}
