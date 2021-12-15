import { createSign } from 'crypto';

const ADJACENT_DELTAS = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
]

const getAdjacentCoords = ([x, y]: [number, number]): [number, number][] => {
  return ADJACENT_DELTAS.map(([yD, xD]) =>
    [y + yD, x + xD]
  );
}

const countCell = (grid: number[][], [x, y]: [number, number], value: number, ignore: Set<string>): number => {
  if (
    y < 0 || y >= grid.length ||
    x < 0 || x >= grid[y].length ||
    ignore.has(`${x},${y}`) ||
    grid[y][x] <= value ||
    value >= 9
  ) {
    return 0;
  }
  return 1;
}

const countAdjacentHigher = (grid: number[][], [_x, _y]: [number, number], value: number, ignore: Set<string>): number => {
  return getAdjacentCoords([_x, _y])
    .reduce((count, [x, y]) => {
      return count + countAdjacentHigher(grid, [x, y], grid[y][x], ignore);
    }, possibleCoords.length);
};

const getLowpoints = (grid: number[][]): [number, number][] => {
  const lowpoints: [number, number][] = [];

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
        lowpoints.push([x, y]);
      }
    }
  }

  return lowpoints;
}

export const main = (grid: number[][]): number => {
  const basins = [];
  const visited = new Set<string>();

  const lowpoints = getLowpoints(grid);

  grid.forEach(line => {
    console.log(line.join(''));
  });

  lowpoints.forEach(([x, y]) => {
    const val = grid[y][x];
    console.log('from', y, x, `(${val})`);
    let size = countAdjacentHigher(grid, [x, y], val, visited) + 1;
    basins.push(size);
  });

  console.log('basins', basins);

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prod, val) => prod * val, 1);
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