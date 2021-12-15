type CountMap = Record<string, number>;
type ExpansionMap = Record<string, string>;
type CountCache = Record<string, Record<number, CountMap>>;

let EXPANSION_MAP: ExpansionMap = {};
let COUNT_CACHE: CountCache = {};

const mergeCountMaps = (a: CountMap, b: CountMap): CountMap => {
  const result = Object.assign({}, a);
  return Object.keys(b)
    .reduce((result, char) => {
      result[char] = (result[char] || 0) + b[char];
      return result;
    }, result);
}

const expand = (pair: string, steps: number): CountMap => {
  if (steps === 0) {
    return {
      [pair[0]]: 1,
      [pair[1]]: 1,
    };
  }
  if (COUNT_CACHE[pair]?.[steps]) {
    return COUNT_CACHE[pair][steps];
  }
  const newChar = EXPANSION_MAP[pair];
  console.log(' --', pair, steps, newChar);
  const leftCount = expand(pair[0] + newChar, steps - 1);
  const rightCount = expand(newChar + pair[1], steps - 1);
  if (!COUNT_CACHE[pair]) {
    COUNT_CACHE[pair] = {};
  }
  COUNT_CACHE[pair][steps] = mergeCountMaps(leftCount, rightCount);
  return COUNT_CACHE[pair][steps];
}

export const main = (start: string, steps: number): number => {
  let polymer: string = start;

  let charCounts: Record<string, number> = polymer
    .split('')
    .reduce((counts, char) => {
      counts[char] = (counts[char] || 0) + 1;
      return counts;
    }, {});

  for(let c = 0; c < polymer.length - 1; c++) {
    const pair = polymer.substring(c, c + 2);
    console.log('expand', pair);
    const newCounts = expand(pair, steps);
    console.log(' -', newCounts);
    charCounts = mergeCountMaps(charCounts, newCounts);
  }

  console.log('final count', charCounts);

  const charsOrdered = Object.keys(charCounts)
    .sort((a, b) => charCounts[a] - charCounts[b]);

  const most = charsOrdered[charsOrdered.length - 1];
  const least = charsOrdered[0];

  return charCounts[most] - charCounts[least];
}

export const execute = (inputs: string[], steps: number): number => {
  EXPANSION_MAP = inputs.slice(2)
    .reduce((map, line) => {
      const [key, value] = line.split(' -> ');
      map[key] = value;
      return map;
    }, {});

  console.log(EXPANSION_MAP);

  return main(
    inputs[0],
    steps,
  )
}
