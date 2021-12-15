export const main = (start: string, map: Record<string, string>, steps: number): number => {
  let polymer: string = start;

  for(let i = 0; i < steps; i++) {
    for(let c = 0; c < polymer.length; c += 2) {
      const pair = polymer.substring(c, c + 2);
      const newVal = map[pair];
      if (newVal) {
        polymer = polymer.substring(0, c + 1) + newVal + polymer.substring(c + 1);
      }
    }
  }

  const charCounts = polymer
    .split('')
    .reduce((counts, char) => {
      counts[char] = (counts[char] || 0) + 1;
      return counts;
    }, {});

  const charsOrdered = Object.keys(charCounts)
    .sort((a, b) => charCounts[a] - charCounts[b]);

  const most = charsOrdered[charsOrdered.length - 1];
  const least = charsOrdered[0];

  return charCounts[most] - charCounts[least];
  // return polymer;
}

export const execute = (inputs: string[], steps: number): number =>
  main(
    inputs[0],
    inputs.slice(2)
      .reduce((map, line) => {
        const [key, value] = line.split(' -> ');
        map[key] = value;
        return map;
      }, {}),
    steps,
  )