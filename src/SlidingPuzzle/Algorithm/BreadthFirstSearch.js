import {
  getFinalBoard,
  move,
  getNeighbors,
  findOpenBox,
  checkBoard
} from './Helpers';

export function BreadthFirstSearch(board) {
  const finalBoard = getFinalBoard(board.length);

  var queue = [];
  queue.push(startingNode);
  var visitedNodes = [];
  while (queue.length !== 0) {
    const current = queue.shift();
    if (current.boardManager.getIsWinning()) {
      return recreatePathFrom(current);
    }
    let blankTile = current.boardManager.getBlankTile();
    if (blankTile.isTile) {
      for (move in blankTile.possibleMoveDirections) {
        let childNode = getChildOfNodeAndMove(current, move);
        if (!visitedNodes.contains(childNode)) {
          visitedNodes.insert(current);
          queue.enqueue(childNode);
        }
      }
    }
  }
  return [];
}
