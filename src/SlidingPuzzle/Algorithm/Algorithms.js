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

  Puzzle.setState({
    movesEstimate: moves.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  });

  if (moves.length > 0) Visualize(Puzzle, moves);
  else Puzzle.setState({ animationActive: false });
}

export function EstimateMoves(board, algorithm) {
  let moves = [];
  switch (algorithm) {
    case 'BruteForce':
      moves = BruteForce(board);
      break;
    default:
      console.log('no algorithm');
      break;
  }
  return moves.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
