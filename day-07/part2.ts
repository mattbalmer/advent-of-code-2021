const triangle = (n: number): number => n * (n + 1) / 2;

export const calcFuel = (positions: number[]): number => {
  const max = Math.max(...positions);
  let least = [-1, Number.MAX_SAFE_INTEGER];

  for(let i = 0; i < max; i++) {
    let sum = 0;
    for(let t = 0; t < positions.length; t++) {
      const target = positions[t];
      sum += triangle(Math.abs(target - i));
      if (sum >= least[1]) {
        break;
      }
    }
    if (sum < least[1]) {
      least[0] = i;
      least[1] = sum;
    }
  }

  console.log('i', least[0])
  return least[1];
}

export const execute = (inputs: string[]): number =>
  calcFuel(
    inputs[0]
      .split(',')
      .map(_ => parseInt(_, 10)),
  )