export const getPosProduct = (inputs: string[]): number => {
  let [x, y, aim] = [0, 0, 0];

  inputs.forEach(input => {
    const parts = input.split(' ');
    const [direction, amount] = [parts[0], parseInt(parts[1])];
    if (direction === 'forward') {
      [x, y] = [x + amount, y + (aim * amount)];
    }
    if (direction === 'up') {
      aim -= amount;
    }
    if (direction === 'down') {
      aim += amount;
    }
  });

  return x * y;
}