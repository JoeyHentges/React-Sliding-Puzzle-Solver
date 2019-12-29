import { Visualize } from '../Visualize/Visualize';
import { BreadthFirstSearch } from './BreadthFirstSearch';
import { getFinalBoard } from './Helpers';

export function Run(Puzzle, board, algorithm) {
  let moves = [];
  const finalBoard = getFinalBoard(board.length);
  switch (algorithm) {
    case 'BreadthFirstSearch':
      moves = BreadthFirstSearch(board, finalBoard);
      break;
    default:
      console.log('no algorithm');
      break;
  }

  if (moves.length > 0) {
    moves = convertMoves(moves);
    console.log(moves);
    Visualize(Puzzle, moves);
  } else {
    document.getElementById('algorithm-result').innerHTML = 'No Solution Found';
    Puzzle.setState({ animationActive: false });
  }
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
