const triangle = (n: number): number => n * (n + 1) / 2;

const calcFuel = (positions: number[]): number => {
  const max = Math.max(...positions);
  let least = Number.MAX_SAFE_INTEGER;

  for(let i = 0; i < max; i++) {
    let sum = 0;
    for(let t = 0; t < positions.length; t++) {
      const target = positions[t];
      sum += triangle(Math.abs(target - i));
      if (sum >= least) {
        break;
      }
    }
    if (sum < least) {
      least = sum;
    }
  }

  return least;
}

export const execute = (inputs: string[]): number =>
  calcFuel(
    inputs[0]
      .split(',')
      .map(_ => parseInt(_, 10)),
  )