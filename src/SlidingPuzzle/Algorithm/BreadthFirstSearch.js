import Node from './Node';

/**
 * Run a search on the board
 * @param {*} board the root board - starting board
 */
export function BreadthFirstSearch(board, finalBoard) {
  // convert the board to a Node
  const root = new Node(board, finalBoard, null);

  // contains all of the nodes that lead to the actual solution
  const PathToSolution = [];
  // contains all of the nodes that you can expand (QUEUE)
  const OpenList = [];
  // contains all of the nodes you cannot expand - already expanded (seen) - don't want to go back over them
  const ClosedList = [];
  // boolean to hold whether final board has been found
  let goalFound = false;

  // enqueue the root
  OpenList.push(root);
  let count = 0;
  // loop!
  while (OpenList.length !== 0 && !goalFound && count < 5) {
    // remove the first Node from the open list
    let currentNode = OpenList.shift();
    // add the removed Node to the closed list
    ClosedList.push(currentNode);
    console.log(count);
    count += 1;

    // expand the node - find the zero and apply all of the available moves
    // new boards are in the child of this node
    currentNode.expandNode();

    for (let i = 0; i < currentNode.children.length; i += 1) {
      let currentChild = currentNode.children[i];
      if (currentChild.isGoal()) {
        console.log('goal found!');
        goalFound = true;
        tracePath(PathToSolution, currentChild);
      }

      // if the current child is not in the open or closed lists, add it to the open list
      if (
        !contains(OpenList, currentChild) &&
        !contains(ClosedList, currentChild)
      ) {
        OpenList.push(currentChild);
      }
    }
  }
  console.log('done');
  return PathToSolution;
}

/**
 * Check if a list of node's boards match the passed in node's board
 * @param {*} list the list of nodes (compared against)
 * @param {*} node the current node (compared to)
 */
const contains = (list, node) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].isSameBoard(node.board)) {
      return true;
    }
  }
  return false;
};

/**
 * This is only called when the goal node is found
 *
 * @param {*} path
 * @param {*} node the goal node
 */
const tracePath = (path, node) => {
  console.log('Tracing Path...');
  let current = node;
  path.unshift(current);

  while (current.parent !== null) {
    current = current.parent;
    path.unshift(current);
  }
};
