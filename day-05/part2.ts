import { parseLine } from './utils';

export const sumOverlap = (input: string[]): number => {
  const counts = {};

  for(let i = 0; i < input.length; i++) {
    const line = parseLine(input[i]);

    const xDir = Math.sign(line[1][0] - line[0][0]);
    const yDir = Math.sign(line[1][1] - line[0][1]);

    const vertical = !xDir;

    const length = Math.abs(
      vertical
        ? line[1][1] - line[0][1]
        : line[1][0] - line[0][0]
    );

    for(let p = 0; p <= length; p++) {
      const x = line[0][0] + (p * xDir);
      const y = line[0][1] + (p * yDir);
      const key = `${x},${y}`;
      if(!counts[key]) {
        counts[key] = 0;
      }
      counts[key] += 1;
    }
  }

  const dangers = Object.values(counts)
    .filter(count => count >= 2)
    .length;

  return dangers;
}