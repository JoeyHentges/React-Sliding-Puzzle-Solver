import {
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
  let comp = 1;
  const moves = [];
  while (!checkBoard(currentBoard, finalBoard) && comp < 10000000) {
    //console.log(currentBoard);
    const random = getRandomXY(currentBoard, findOpenBox(currentBoard));
    //console.log(random);
    currentBoard = move(currentBoard, random.row, random.column);
    //console.log(currentBoard);
    //console.log('\n');
    comp += 1;
    moves.push({ row: random.row, column: random.column });
  }

  console.log('done');
  //console.log(moves);
  console.log(checkBoard(currentBoard, finalBoard));
  console.log(currentBoard);
  return {
    board: currentBoard,
    move,
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
