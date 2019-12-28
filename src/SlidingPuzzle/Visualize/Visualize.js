import { findOpenBox } from '../Algorithm/Helpers';

export function Visualize(SliderPuzzle, moves) {
  const open = findOpenBox(SliderPuzzle.state.board.getMatrix());
  let pastMove = { row: open.row, column: open.column };
  //const moves = getMoves();
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
}

const getDirection = (currentRow, currentColumn, newRow, newColumn) => {
  //console.log(currentRow, currentColumn);
  //console.log(newRow, newColumn);
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

const getMoves = () => {
  return [
    {
      row: 1,
      column: 2
    },
    {
      row: 1,
      column: 1
    },
    {
      row: 2,
      column: 1
    },
    {
      row: 2,
      column: 2
    }
  ];
};
