type Coordinate = [number, number];
type Grid = number[][];
type PartialTrail = {
  distance: number,
  coordinate: Coordinate,
  risk: number,
}

const ADJACENT_DELTAS = [
  [0,1],
  [1,0],
  [-1,0],
  [0,-1],
]

const valueAt = (grid: Grid, coordinate: Coordinate): number => grid[coordinate[1]][coordinate[0]];
const distanceBetween = (a: Coordinate, b: Coordinate): number =>
  Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
const coordsMatch = (a: Coordinate, b: Coordinate): boolean => a[0] === b[0] && a[1] === b[1];
const isCoordValid = (grid: Grid, coord: Coordinate): boolean =>
  coord[0] >= 0 && coord[0] < grid.length && coord[1] >= 0 && coord[1] < grid.length;

const riskTo = (grid: Grid, start: Coordinate, end: Coordinate, history: Coordinate[] = []): number => {
  const valueHere = valueAt(grid, end);
  console.log('riskTo', start, end, valueHere);
  if (coordsMatch(start, end)) {
    return valueHere;
  }
  const lowestRiskPath: number = ADJACENT_DELTAS
    .map(delta =>
      [start[0] + delta[0], start[1] + delta[1]] as Coordinate
    )
    .filter(coord =>
      isCoordValid(grid, coord) &&
      !history.some(prev => coordsMatch(coord, prev))
    )
    .map(coord =>
      [valueAt(grid, coord), coord] as [number, Coordinate]
    )
    .sort((a, b) => a[0] - b[0])
    .map(([, coord]: [number, Coordinate]) =>
      [riskTo(grid, coord, end, [...history, start]), coord] as [number, Coordinate]
    )
    .sort((a, b) => a[0] - b[0])
    [0]?.[0] || 99999
  ;
  return valueHere + lowestRiskPath;
}

export const main = (grid: Grid): number => {
  console.log('grid?', grid);
  return riskTo(grid, [0,0], [grid.length - 1, grid.length - 1]);
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