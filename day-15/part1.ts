type Coordinate = [number, number];
type Grid = number[][];
type PartialPath = {
  score: number,
  risk: number,
  history: string[],
}

const AVERAGE_RISK_PER_CELL = 4.5;
const ADJACENT_DELTAS = [
  [0,1],
  [1,0],
  [-1,0],
  [0,-1],
]

const valueAt = (grid: Grid, coordinate: Coordinate): number => grid[coordinate[1]][coordinate[0]];
const distanceBetween = (a: Coordinate, b: Coordinate): number =>
  Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
const riskBetween = (a: Coordinate, b: Coordinate): number =>
  (distanceBetween(a, b) - 1) * AVERAGE_RISK_PER_CELL;
const coordsMatch = (a: Coordinate, b: Coordinate): boolean => a[0] === b[0] && a[1] === b[1];
const isCoordValid = (grid: Grid, coord: Coordinate): boolean =>
  coord[0] >= 0 && coord[0] < grid.length && coord[1] >= 0 && coord[1] < grid.length;
const coordToStr = (coord: Coordinate): string => `${coord[0]},${coord[1]}`;
const strToCoord = (str: string): Coordinate => str.split(',').map(_ => parseInt(_, 10)) as Coordinate;

export const main = (grid: Grid): number => {
  const start: Coordinate = [0,0];
  const end: Coordinate = [grid.length - 1, grid.length - 1];

  const paths: PartialPath[] = [{
    score: riskBetween(start, end),
    risk: 0,
    history: [coordToStr(start)]
  }];

  while(paths.length > 0) {
    const { score, risk, history }: PartialPath = paths.shift();
    const coord: Coordinate = strToCoord(history[history.length - 1]);
    console.log(score, risk, history);

    if (coordsMatch(coord, end)) {
      return risk;
    }

    ADJACENT_DELTAS
      .map(delta =>
        [coord[0] + delta[0], coord[1] + delta[1]] as Coordinate
      )
      .filter(c =>
        isCoordValid(grid, c) &&
        !history.includes(coordToStr(c))
      )
      .map(c =>
        [valueAt(grid, c)/* + riskBetween(c, end)*/, valueAt(grid, c), c] as [number, number, Coordinate]
      )
      .sort((a, b) => a[0] - b[0])
      .forEach(([nScore, nRisk, nCoord]) => {
        const i = paths.findIndex(partial => partial.score > nScore);
        paths.splice(i >= 0 ? i : paths.length, 0, {
          score: nScore,
          risk: risk + nRisk,
          history: [...history, coordToStr(nCoord)],
        });
      });
  }
}

export const execute = (inputs: string[]): number =>
  main(
    inputs
      .map(line =>
        line
          .split('')
          .map(_ => parseInt(_, 10)),
      ),
  )