import { Coordinate, CoordinateMap, coordToStr } from '../utils/coordinates';
import { PriorityQueue } from '../utils/misc';

const ADJACENT_DELTAS = [
  [0,1],
  [1,0],
  [-1,0],
  [0,-1],
]

const distanceBetween = (a: Coordinate, b: Coordinate): number =>
  Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
const riskBetween = (a: Coordinate, b: Coordinate): number =>
  (distanceBetween(a, b) - 1) * 9;
const coordsMatch = (a: Coordinate, b: Coordinate): boolean => a[0] === b[0] && a[1] === b[1];
const isCoordValid = (coord: Coordinate, length: number): boolean =>
  coord[0] >= 0 && coord[0] < length && coord[1] >= 0 && coord[1] < length;

const reconstructPath = (bestNeighbor: CoordinateMap<Coordinate>, current: Coordinate): Coordinate[] => {
  const path = [current];

  while (bestNeighbor.has(current)) {
    current = bestNeighbor.get(current);
    path.unshift(current)
  }

  return path;
}
const sumPath = (path: Coordinate[], grid: CoordinateMap<number>): number => {
  return path.reduce((sum, coordinate) => sum + grid.get(coordinate), 0);
}

export const main = (grid: CoordinateMap<number>): number => {
  const start: Coordinate = [0,0];
  const end: Coordinate = [grid.size - 1, grid.size - 1];

  const paths = new PriorityQueue<Coordinate>([
    [riskBetween(start, end), start]
  ]);

  const bestNeighbor = new CoordinateMap<Coordinate>(grid.size);

  const lowestRisk = new CoordinateMap<number>(grid.size, {
    [coordToStr(start)]: 0,
  }, Infinity);

  const bestGuess = new CoordinateMap<number>(grid.size, {
    [coordToStr(start)]: distanceBetween(start, end),
  }, Infinity);

  while(paths.length > 0) {
    const [score,current]: [number,Coordinate] = paths.shift();

    // console.log(`${coordToStr(current)}`, score);

    if (coordsMatch(current, end)) {
      console.log('board');
      grid.log();
      return sumPath(
        reconstructPath(bestNeighbor, current).slice(1),
        grid,
      );
    }

    const neighbors = ADJACENT_DELTAS
      .map(delta =>
        [current[0] + delta[0], current[1] + delta[1]] as Coordinate
      )
      .filter(c => isCoordValid(c, grid.size));

    neighbors
      .forEach(neighbor => {
        const riskAt = grid.get(neighbor);
        const tentative = lowestRisk.get(current) + riskAt;
        // console.log(' -n', neighbor, riskAt, lowestRisk.get(current), tentative);

        if (tentative < lowestRisk.get(neighbor)) {
          const bestGuessValue = tentative + distanceBetween(neighbor, end);

          bestNeighbor.set(neighbor, current);
          lowestRisk.set(neighbor, tentative);
          bestGuess.set(neighbor, bestGuessValue);

          const isNeighborInQueue = paths.some(coord => coordsMatch(coord, neighbor));
          if (!isNeighborInQueue) {
            paths.insert(bestGuessValue, neighbor);
          }
        }
      });
  }
}

export const execute = (inputs: string[]): number =>
  main(
    new CoordinateMap<number>(
      inputs.length * 5,
      inputs
        .reduce((grid, line, y) => {
          line
            .split('')
            .map((_, x) => {
              grid[coordToStr([x, y])] = parseInt(_, 10);
            });
          return grid;
        }, {}),
      function([x, y]) {
        const boardsAway = [x / inputs.length, y / inputs.length].reduce((sum, dist) => sum + Math.floor(dist), 0);
        const original = this.get([x % inputs.length, y % inputs.length]);
        const raw = original + boardsAway;
        return [9,1,2,3,4,5,6,7,8][raw % 9];
      }
    ),
  )