export const getMean = (list: number[]): number => {
  return list
    .reduce((sum, v) => sum + v, 0) / list.length
}
export const getIndex = (list: number[]): number => {
  const sum = list
    .reduce((sum, v) => sum + v, 0);
  const average = (sum) / (list.length - 1);
  // return Math.floor(average + 0.5);
  return Math.floor(average);
}

const triangle = (n: number): number => n * (n + 1) / 2;

export const calcFuel = (positions: number[]): number => {
  const mean = getIndex(positions);
  console.log('mean', mean);
  const distances = positions.map(pos => triangle(Math.abs(pos - mean)));
  return distances.reduce((sum, v) => sum + v, 0);
}

const execute = (inputs: string[]): number =>
  calcFuel(
    inputs[0]
      .split(',')
      .map(_ => parseInt(_, 10)),
  )