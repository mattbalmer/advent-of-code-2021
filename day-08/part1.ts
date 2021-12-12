type Entry = {
  signals: string[],
  output: string[],
}

const countEasy = (entries: Entry[]): number => {
  let count = 0;

  entries.forEach(entry => {
    entry.output.forEach(signal => {
      if ([2,3,4,7].includes(signal.length)) {
        count += 1;
      }
    });
  });

  return count;
}

export const execute = (inputs: string[]): number =>
  countEasy(
    inputs
      .map(line => {
        const [signals, output] = line
          .split(' | ')
          .map(part =>
            part
              .split(' ')
              .filter(_ => !!_)
          );
        return { signals, output };
      })
  )