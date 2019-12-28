import { findOpenBox } from '../Algorithm/Helpers';

export function Visualize(SliderPuzzle, moves) {
  if (!SliderPuzzle.state.animation) {
    VisualizeNoAnimation(SliderPuzzle, moves);
    return;
  }
  const open = findOpenBox(SliderPuzzle.state.board.getMatrix());
  let pastMove = { row: open.row, column: open.column };
  for (let i = 0; i < moves.length; i += 1) {
    const { row, column } = moves[i];

    setTimeout(() => {
      const direction = getDirection(
        row,
        column,
        pastMove.row,
        pastMove.column
      );
      document.getElementById(
        'box-' + row + '-' + column
      ).className = direction;

      setTimeout(() => {
        document.getElementById('box-' + row + '-' + column).className = '';
        document.getElementById(
          'box-' + pastMove.row + '-' + pastMove.column
        ).className = 'empty';
        SliderPuzzle.move(column, row);
        pastMove = { row, column };
      }, 500);
    }, 1000 * i);
  }
  setTimeout(() => {
    SliderPuzzle.setState({ animationActive: false });
  }, 1000 * moves.length);
}

const VisualizeNoAnimation = (SliderPuzzle, moves) => {
  for (let i = 0; i < moves.length; i += 1) {
    const { row, column } = moves[i];
    setTimeout(() => {
      SliderPuzzle.move(column, row);
    }, SliderPuzzle.state.animationSpeed * i);
  }
  setTimeout(() => {
    SliderPuzzle.setState({ animationActive: false });
  }, SliderPuzzle.state.animationSpeed * moves.length);
};

const getDirection = (currentRow, currentColumn, newRow, newColumn) => {
  if (currentRow < newRow) {
    return 'move-down';
  } else if (currentRow > newRow) {
    return 'move-up';
  } else if (currentColumn < newColumn) {
    return 'move-left';
  } else if (currentColumn > newColumn) {
    return 'move-right';
  } else {
    return '';
  }
};
