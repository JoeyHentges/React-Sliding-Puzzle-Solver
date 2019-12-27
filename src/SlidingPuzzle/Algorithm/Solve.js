import {
  getFinalBoard,
  move,
  getNeighbors,
  findOpenBox,
  checkBoard
} from './Helpers';

const EMPTY = 0;

export function solveBoard(board) {
  //console.log(board, bugBoard);
  //console.log(board === bugBoard);
  const finalBoard = getFinalBoard(board.length);
  let currentBoard = board;
  //console.log(board[2][3]);
  //console.log(move(board, 2, 3));
  //console.log(findOpenBox(board));
  //console.log(getRandomXY(board, findOpenBox(board)));
  //console.log(finalBoard);
  //const temp = getNeighbors(board, 2, 2);
  //console.log(board[2][2]);
  //console.log(temp);
  //console.log(board);
  /*
  console.log(currentBoard);
  const random = getRandomXY(currentBoard, findOpenBox(currentBoard));
  console.log(random);
  currentBoard = move(currentBoard, random.row, random.column);
  console.log(currentBoard);
  */
  let comp = 1;
  while (!checkBoard(currentBoard, finalBoard) && comp < 5) {
    console.log(currentBoard);
    const random = getRandomXY(currentBoard, findOpenBox(currentBoard));
    console.log(random);
    currentBoard = move(currentBoard, random.row, random.column);
    console.log(currentBoard);
    console.log('\n');
    comp += 1;
    /*
    setTimeout(() => {
      console.log(currentBoard);
      const random = getRandomXY(currentBoard, findOpenBox(currentBoard));
      currentBoard = move(currentBoard, random.row, random.column);
      console.log(currentBoard);
    }, 500);
    */
  }
  console.log('done');
  const seenBoard = [];
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
