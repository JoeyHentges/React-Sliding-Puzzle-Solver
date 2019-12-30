class Solver {
  /**
   *
   * @param {*} start the current puzzle
   */
  constructor(start) {
    this.start = start;
  }

  // Preform Breadth first search and return the path to the solution if it exists
  solve() {
    const queue = []; // queue of boards to path through
    const seen = []; // the already seen/visited boards

    queue.push(this.start);
    seen.push(queue[0].state);

    while (queue.length !== 0) {
      //
    }
  }
}
