export const main = (grid: number[][], steps: number): number => {
  const total = grid.length * grid.length;

  for(let i = 0; i < steps; i++) {
    const flashing: [number, number][] = [];
    let flashesThisStep = 0;

    for(let x = 0; x < grid.length; x++) {
      for(let y = 0; y < grid[x].length; y++) {
        grid[x][y] += 1;
        if (grid[x][y] > 9) {
          grid[x][y] = 0;
          flashing.push([x, y]);
        }
      }
    }

    while (flashing.length > 0) {
      const [x, y] = flashing.shift();
      flashesThisStep += 1;

      for(let xD = -1; xD <= 1; xD++) {
        for(let yD = -1; yD <= 1; yD++) {
          const [xA, yA] = [x + xD, y + yD];

          if (
            (xD === 0 && yD === 0) ||
            xA < 0 || xA >= grid.length ||
            yA < 0 || yA >= grid[xA].length ||
            grid[xA][yA] === 0
          ) {
            continue;
          }

          grid[xA][yA] += 1;
          if (grid[xA][yA] > 9) {
            grid[xA][yA] = 0;
            flashing.push([xA, yA]);
          }
        }
      }
    }

    if (flashesThisStep === total) {
      return i + 1;
    }
  }

  return -1;
}

export const execute = (inputs: string[], steps: number): number =>
  main(
    inputs
      .map(line =>
        line
          .split('')
          .map(_ => parseInt(_, 10)),
      ),
    steps,
  )