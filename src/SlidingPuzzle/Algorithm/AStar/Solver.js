import Node from './Node';

export default class Solver {
  /**
   *
   * @param {*} start the current puzzle
   */
  constructor(start) {
    this.start = start;
  }

  // Preform Breadth first search and return the path to the solution if it exists
  solve() {
    let queue = []; // queue of boards to path through
    const seen = []; // the already seen/visited boards

    queue.push(new Node(this.start));
    seen.push(queue[0].state());
    let count = 0; // don't allow the algorithm to go on forever (max 100,000 loops)
    while (queue.length !== 0 && count < 100000) {
      count += 1;
      queue = this.sortQueue(queue); // sort the queue

      let node = queue.shift();
      if (node.solved()) {
        return node.path();
      }
      console.log(count, seen.length, queue.length);

      const actions = node.actions();
      for (let i = 0; i < actions.length; i += 1) {
        let child = new Node(actions[i].board, node, actions[i].action);
        if (!seen.includes(child.state())) {
          queue.unshift(child);
          seen.push(child.state());
        }
      }
    }
    return null;
  }

  sortQueue(queue) {
    return queue.sort((a, b) => (a.F() > b.F() ? 1 : b.F() > a.F() ? -1 : 0));
  }
}
