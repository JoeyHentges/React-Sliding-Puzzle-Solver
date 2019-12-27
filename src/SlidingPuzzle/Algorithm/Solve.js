import {
  toMatrix,
  getFinalBoard,
  move,
  getNeighbors,
  findOpenBox,
  checkBoard
} from './Helpers';

export function solveBoard(board) {
  console.log(board);
  const finalBoard = getFinalBoard(board.length);
  let currentBoard = board.slice(0);
  const moves = [];
  let count = 0;
  while (!checkBoard(currentBoard, finalBoard) && count < 100) {
    const random = getRandomXY(currentBoard, findOpenBox(currentBoard));
    currentBoard = move(currentBoard, random.row, random.column);
    moves.push({ row: random.row, column: random.column });
    count += 1;
  }
  return {
    board: currentBoard,
    moves,
    numberMoves: moves.length
  };
}

function getRandomXY(board, { row, column }) {
  const neighbors = getNeighbors(board, row, column);
  //console.log(neighbors);
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
