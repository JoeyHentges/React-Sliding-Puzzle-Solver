import { Visualize } from '../Visualize/Visualize';
import { BreadthFirstSearch } from './BreadthFirstSearch';

export function Run(Puzzle, board, algorithm) {
  let moves = [];
  switch (algorithm) {
    case 'BreadthFirstSearch':
      moves = BreadthFirstSearch(board);
      break;
    default:
      console.log('no algorithm');
      break;
  }

  console.log(moves);
  if (moves.length > 0) {
    moves = convertMoves(moves);
    Visualize(Puzzle, moves);
  } else Puzzle.setState({ animationActive: false });
}

// convert the given list of 'moves' to x/y coordinates
const convertMoves = moves => {
  const xy = [];
  let lastBoard = moves[0];
  const numRowsColumns = moves[0].columns;
  for (let i = 1; i < moves.length; i += 1) {
    const movedBox = lastBoard.zeroIndex + moves[i].moveAmount;
    const temp = convertIndexToXY(numRowsColumns, movedBox);
    xy.push(temp);
    lastBoard = moves[i];
  }
  return xy;
};

const convertIndexToXY = (numRowsColumns, index) => {
  return {
    row: Math.floor(index / numRowsColumns),
    column: index % numRowsColumns
  };
};
