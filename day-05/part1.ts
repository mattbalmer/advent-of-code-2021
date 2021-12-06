import { parseLine } from './utils';

export const sumOverlap = (input: string[]): number => {
  const counts = {};

  for(let i = 0; i < input.length; i++) {
    const line = parseLine(input[i]);
    const vertical = line[0][0] === line[1][0];
    const horizontal = line[0][1] === line[1][1];

    if (vertical || horizontal) {
      const c = horizontal ? 0 : 1;
      const start = Math.min(line[0][c], line[1][c])
      const end = Math.max(line[0][c], line[1][c]);
      const locked = line[0][c ? 0 : 1];
      for(let scaling = start; scaling <= end; scaling++) {
        const x = horizontal ? scaling : locked;
        const y = vertical ? scaling : locked;
        const key = `${x},${y}`;
        if(!counts[key]) {
          counts[key] = 0;
        }
        counts[key] += 1;
      }
    }
  }

  const dangers = Object.values(counts)
    .filter(count => count >= 2)
    .length;

  return dangers;
}