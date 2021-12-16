type Coordinate = [number, number];
type Grid = number[][];

const ADJACENT_DELTAS = [
  [0,1],
  [1,0],
];

const valueAt = (grid: Grid, coordinate: Coordinate): number => grid[coordinate[1]][coordinate[0]];
const coordsMatch = (a: Coordinate, b: Coordinate): boolean => a[0] === b[0] && a[1] === b[1];
const isCoordValid = (grid: Grid, coord: Coordinate): boolean =>
  coord[0] >= 0 && coord[0] < grid.length && coord[1] >= 0 && coord[1] < grid.length;
const coordToStr = (coord: Coordinate): string => `${coord[0]},${coord[1]}`;
const strToCoord = (str: string): Coordinate => str.split(',').map(_ => parseInt(_, 10)) as Coordinate;

export const main = (grid: Grid): number => {
  const start: Coordinate = [0,0];
  const end: Coordinate = [grid.length - 1, grid.length - 1];
  const LOWEST_RISK_TO: Record<string, number> = {
    [coordToStr(start)]: 0
  };

  const coordinates: [number, Coordinate][] = [[0, start]];

  while(coordinates.length > 0) {
    const [risk, coord] = coordinates.shift();
    const coordString = coordToStr(coord);

    ADJACENT_DELTAS
      .map(delta =>
        [coord[0] + delta[0], coord[1] + delta[1]] as Coordinate
      )
      .filter(c =>
        isCoordValid(grid, c)
      )
      .forEach(c => {
        const r = valueAt(grid, c);
        const key = coordToStr(c);
        LOWEST_RISK_TO[key] = Math.min(risk + r, LOWEST_RISK_TO[key] || Number.MAX_SAFE_INTEGER);
        coordinates.push([risk + r, c]);
      });
  }

  console.log(LOWEST_RISK_TO);

  return LOWEST_RISK_TO[coordToStr(end)];
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