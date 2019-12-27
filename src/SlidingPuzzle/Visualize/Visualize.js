export function Visualize(SliderPuzzle, moves) {
  console.log(moves);
  let count = 0;
  for (let i = 0; i < moves.length; i += 1) {
    setTimeout(() => {
      const { row, column } = moves[count];
      SliderPuzzle.move(row, column);
      count += 1;
    }, 100 * i);
  }
}
