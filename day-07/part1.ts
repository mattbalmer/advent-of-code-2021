const getMedian = (list: number[]): number => {
  return list
    .sort((a, b) => a - b)
    .slice(list.length / 2 - 1, list.length / 2 + 1) // apparently this auto-floors
    .reduce((sum, v) => sum + v, 0) / (2 - list.length % 2)
}

const calcFuel = (positions: number[]): number => {
  const median = getMedian(positions);
  const distances = positions.map(pos => Math.abs(pos - median));
  return distances.reduce((sum, v) => sum + v, 0);
}

export const execute = (inputs: string[]): number =>
  calcFuel(
    inputs[0]
      .split(',')
      .map(_ => parseInt(_, 10)),
  )