export const getPosProduct = (inputs: string[]): number => {
  let [x, y] = [0, 0];

  inputs.forEach(input => {
    const parts = input.split(' ');
    const [direction, amount] = [parts[0], parseInt(parts[1])];
    if (direction === 'forward') {
      x += amount;
    }
    if (direction === 'up') {
      y -= amount;
    }
    if (direction === 'down') {
      y += amount;
    }
  });

  return x * y;
}