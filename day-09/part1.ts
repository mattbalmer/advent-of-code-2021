const ADJACENT_DELTAS = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
]

export const main = (grid: number[][]): number => {
  const lowpoints = [];

  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      const val = grid[y][x];
      let isLowest = true;

      ADJACENT_DELTAS.forEach(([yD, xD]) => {
        const [yA, xA] = [y + yD, x + xD];
        if (
          yA < 0 || yA >= grid.length ||
          xA < 0 || xA >= grid[yA].length
        ) {
          return;
        }

        if (val >= grid[yA][xA]) {
          isLowest = false;
        }
      });

      if (isLowest) {
        lowpoints.push(val);
      }
    }
  }

  return lowpoints.reduce((sum, val) => sum + val + 1, 0);
}

export const execute = (inputs: string[]): number =>
  main(
    inputs
      .map(line =>
        line
          .split('')
          .map(_ => parseInt(_, 10)),
      )
  )