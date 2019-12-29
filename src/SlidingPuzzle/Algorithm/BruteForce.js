import {
  getFinalBoard,
  move,
  getNeighbors,
  findOpenBox,
  checkBoard
} from './Helpers';

export function BruteForce(board) {
  const finalBoard = getFinalBoard(board.length);
  const moves = [];
  let count = 0;
  let currentBoard = board.slice();

  while (!checkBoard(currentBoard, finalBoard) && count < 100000) {
    const random = getRandomXY(currentBoard, findOpenBox(currentBoard));
    currentBoard = move(currentBoard, random.row, random.column);
    moves.push({ row: random.row, column: random.column });
    count += 1;
  }

  console.log(checkBoard(currentBoard, finalBoard), count);
  return moves;
}

function getRandomXY(board, { row, column }) {
  const neighbors = getNeighbors(board, row, column);
  return neighbors[Math.floor(Math.random() * neighbors.length)];
}
