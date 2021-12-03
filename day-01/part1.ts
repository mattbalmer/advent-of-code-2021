export const countIncreases = (inputs: number[]): number => {
  let increases = 0;
  let previous = inputs[0];

  if (inputs.length < 2) {
    return 0;
  }

  for(let i = 1; i < inputs.length; i++) {
    let current = inputs[i];
    if (current > previous) {
      increases += 1;
    }
    previous = current
  }

  return increases;
}