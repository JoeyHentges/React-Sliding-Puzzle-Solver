import { BruteForce } from './BruteForce';
import { Visualize } from '../Visualize/Visualize';

export function Run(Puzzle, board, algorithm) {
  let moves = [];
  switch (algorithm) {
    case 'BruteForce':
      moves = BruteForce(board);
      break;
    default:
      console.log('no algorithm');
      break;
  }
  if (moves.length > 0) Visualize(Puzzle, moves);
  else Puzzle.setState({ animationActive: false });
}
