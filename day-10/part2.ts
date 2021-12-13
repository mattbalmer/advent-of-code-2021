const OPEN_TO_CLOSE = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const CLOSE_TO_OPEN = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}

const POINT_VALUES = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const getIncompleteChars = (line: string): string[] => {
  const stack = [];

  for(let i = 0; i < line.length; i++) {
    const char = line[i];
    const openingMirror = CLOSE_TO_OPEN[char];

    if (!openingMirror) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (last !== openingMirror) {
        return [];
      }
    }
  }

  return stack.reverse().map(char => OPEN_TO_CLOSE[char]);
}

export const main = (lines: string[]): number => {
  const points = lines
    .map((line) => {
      const missing = getIncompleteChars(line);
      return missing
        .reduce((sum, char) =>
          sum * 5 + (POINT_VALUES[char] || 0),
        0);
    })
    .filter(points => points > 0)
    .sort((a, b) => b - a);

  return points[Math.floor(points.length / 2)];
}

export const execute = (inputs: string[]): number =>
  main(
    inputs
  )