import Board from './Board';
import Solver from './Solver';

export function AStar(board) {
  const rootBoard = new Board(board);
  const solver = new Solver(rootBoard);
  const path = solver.solve();
  const moves = convertPathToMoves(path);
  return moves;
}

/**
 * Convert the path in node form to x/y coordinates (moves on the board)
 * @param {*} path an array (list) of nodes
 */
const convertPathToMoves = path => {
  const xy = [];
  for (let i = 1; i < path.length; i += 1) {
    xy.push(path[i].board.getZero());
  }
  return xy;
};
