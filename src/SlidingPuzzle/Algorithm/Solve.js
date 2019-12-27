import { getFinalBoard, move, getNeighbors } from './Helpers';

const EMPTY = 0;

export function solveBoard(board) {
  const finalBoard = getFinalBoard(board.length);
  console.log(board[2][3]);
  console.log(move(board, 2, 3));
  //console.log(finalBoard);
  const temp = getNeighbors(board, 2, 2);
  //console.log(board[2][2]);
  //console.log(temp);
  const seenBoard = [];
}

function BreadthFirstSearch(grid, startNode) {
  const visitedNodesInOrder = [];
  const queue = [];

  queue.push(startNode);

  while (queue.length !== 0) {
    const curr = queue.shift();
    if (curr.isVisited) {
      continue;
    }
    visitedNodesInOrder.push(curr);
    curr.isVisited = true;
    if (curr.previousNode === null) {
      grid[curr.row][curr.column].distance = 0;
    } else {
      grid[curr.row][curr.column].distance = curr.previousNode + 1;
    }
    if (curr.isFinish) {
      return visitedNodesInOrder;
    }

    const adjacentNodes = getNeighbors(curr, grid);
    adjacentNodes.forEach(node => {
      if (!node.isWall) {
        if (!node.isVisited) {
          grid[node.row][node.column].previousNode = curr;
          queue.push(node);
        }
      }
    });
  }
  return visitedNodesInOrder;
}
