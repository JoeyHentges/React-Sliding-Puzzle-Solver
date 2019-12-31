import { Visualize } from '../Visualize/Visualize';
import { AStar } from './AStar/AStar';
import { BreadthFirstSearch } from './BreadthFirstSearch/BreadthFirstSearch';

export function Run(Puzzle, boardObj, algorithm) {
  const tempBoard = boardObj.getMatrix();
  let moves = [];
  switch (algorithm) {
    case 'AStar':
      moves = AStar(boardObj.getMatrix());
      break;
    case 'BreadthFirstSearch':
      moves = BreadthFirstSearch(boardObj.getBoard());
      break;
    default:
      console.log('no algorithm');
      break;
  }
  console.log(tempBoard);
  console.log(moves);
  if (moves.length > 0) {
    Visualize(Puzzle, moves);
  } else {
    document.getElementById('algorithm-result').innerHTML = 'No Solution Found';
    Puzzle.setState({ animationActive: false });
  }
}
