const CLOSE_TO_OPEN = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}

const POINT_VALUES = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const getFirstIllegalCharacter = (line: string): string => {
  const stack = [];

  for(let i = 0; i < line.length; i++) {
    const char = line[i];
    const openingMirror = CLOSE_TO_OPEN[char];

    if (!openingMirror) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (last !== openingMirror) {
        return char;
      }
    }
  }

  return null;
}

export const main = (lines: string[]): number => {
  return lines.reduce((points, line) => {
    const firstIllegal = getFirstIllegalCharacter(line);
    return points + (POINT_VALUES[firstIllegal] || 0);
  }, 0);
}

export const execute = (inputs: string[]): number =>
  main(
    inputs
  )