const sum = (list: number[]): number => list.reduce((sum, e) => sum + e, 0);

export const countWindowIncreases = (inputs: number[], windowSize: number): number => {
  let increases = 0;
  let previousSum;

  if (inputs.length < windowSize + 1) {
    return 0;
  }

  for(let i = 0; i <= inputs.length - windowSize; i++) {
    let currentSum = sum(inputs.slice(i, i + windowSize));
    if (previousSum !== undefined && currentSum > previousSum) {
      increases += 1;
    }
    previousSum = currentSum;
  }

  return increases;
}