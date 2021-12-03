const sum = (list: number[]): number => list.reduce((sum, e) => sum + e, 0);

export const countWindowIncreases = (inputs: number[], windowSize: number): number => {
  let increases = 0;
  let previousSum = sum(inputs.slice(0, windowSize));

  if (inputs.length < windowSize + 1) {
    return 0;
  }

  for(let i = 1; i <= inputs.length - windowSize; i++) {
    const previousValue = inputs[i - 1];
    const newValue = inputs[i + windowSize - 1];
    let currentSum = previousSum - previousValue + newValue;
    if (previousSum !== undefined && currentSum > previousSum) {
      increases += 1;
    }
    previousSum = currentSum;
  }

  return increases;
}