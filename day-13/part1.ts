enum Axis {
  X = 'X',
  Y = 'Y',
}

type Coordinate = [number, number];
type Fold = {
  axis: Axis,
  value: number,
}
type Grid = Record<string, boolean>;

const printGrid = (grid: Grid) => {
  let [xMax, yMax] = [0, 0];

  Object.keys(grid).forEach(key => {
    let [x, y] = key.split(',').map(_ => parseInt(_, 10));
    xMax = Math.max(x, xMax);
    yMax = Math.max(y, yMax);
  });

  let str = '';

  for(let y = 0; y <= yMax; y++) {
    for(let x = 0; x <= xMax; x++) {
      const val = grid[keyFor([x, y])] ? '#' : '.';
      str += val;
    }
    str += '\n'
  }

  console.log(str);
}

const keyFor = (coordinate: Coordinate): string => `${coordinate[0]},${coordinate[1]}`;

const generateGrid = (coordinates: Coordinate[]): Grid => {
  return coordinates.reduce((grid, coordinate) => {
    grid[keyFor(coordinate)] = true;
    return grid;
  }, {});
}

const foldGrid = (grid: Grid, fold: Fold): Grid => {
  return Object.keys(grid)
    .reduce((newGrid, key) => {
      let [x, y] = key.split(',').map(_ => parseInt(_, 10));
      if (fold.axis === Axis.X && x > fold.value) {
        x = fold.value - (x - fold.value);
      }
      if (fold.axis === Axis.Y && y > fold.value) {
        y = fold.value - (y - fold.value);
      }
      newGrid[keyFor([x, y])] = true;
      return newGrid;
    }, {});
}

export const main = (coordinates: Coordinate[], folds: Fold[], steps?: number): number => {
  let grid = generateGrid(coordinates);

  folds.slice(0, steps || folds.length).forEach(fold => {
    grid = foldGrid(grid, fold);
  });

  printGrid(grid);

  return Object.keys(grid).length;
}

export const execute = (inputs: string[], steps?: number): number => {
  const coordinates = [];
  const folds = [];

  inputs.forEach(line => {
    if (line) {
      if (line.startsWith('fold along')) {
        const [axis, value] = line
          .replace('fold along ', '')
          .split('=');
        folds.push({
          axis: axis.toUpperCase(),
          value: parseInt(value),
        });
      } else {
        const [x, y] = line.split(',');
        coordinates.push([x, y]);
      }
    }
  });

  return main(
    coordinates,
    folds,
    steps,
  )
}
