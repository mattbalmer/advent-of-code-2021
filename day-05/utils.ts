export type Coordinate = [number, number];
export type Line = [Coordinate, Coordinate];

export const parseLine = (line: string): Line => {
  // @ts-ignore
  return line
    .split('->')
    .map(coord =>
      coord
        .split(',')
        .map(num =>
          parseInt(num, 10)
        )
    );
}