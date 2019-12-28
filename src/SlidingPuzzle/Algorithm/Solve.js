import {
  getFinalBoard,
  move,
  getNeighbors,
  findOpenBox,
  checkBoard
} from './Helpers';

export function solveBoard(board) {
  const finalBoard = getFinalBoard(board.length);
  const moves = [];
  let count = 0;
  let currentBoard = board.slice();

  while (!checkBoard(currentBoard, finalBoard) && count < 1000000) {
    const random = getRandomXY(currentBoard, findOpenBox(currentBoard));
    currentBoard = move(currentBoard, random.row, random.column);
    moves.push({ row: random.row, column: random.column });
    count += 1;
  }
  console.log(checkBoard(currentBoard, finalBoard), currentBoard);
  console.log('done');
  if (!checkBoard(currentBoard, finalBoard)) {
    return [];
  }
  return moves;
}

function getRandomXY(board, { row, column }) {
  const neighbors = getNeighbors(board, row, column);
  return neighbors[Math.floor(Math.random() * neighbors.length)];
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
