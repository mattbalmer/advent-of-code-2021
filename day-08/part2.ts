import { generate } from '../utils/array';

enum SegPos {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
}

const SEGMENTS_TO_NUMBERS: Record<SegPos, number[]> = {
  [SegPos.A]: [0,2,3,5,6,7,8,9],
  [SegPos.B]: [0,4,5,6,8,9],
  [SegPos.C]: [0,1,2,3,4,7,8,9],
  [SegPos.D]: [2,3,4,5,6,8,9],
  [SegPos.E]: [0,2,6,8],
  [SegPos.F]: [0,1,3,4,5,6,7,8,9],
  [SegPos.G]: [0,2,3,5,6,8,9],
}

const NUMBERS_TO_SEGMENTS: Record<number, SegPos[]> = {
  0: [SegPos.A, SegPos.B, SegPos.C, SegPos.E, SegPos.F, SegPos.G],
  1: [SegPos.C, SegPos.F],
  2: [SegPos.A, SegPos.C, SegPos.D, SegPos.E, SegPos.G],
  3: [SegPos.A, SegPos.C, SegPos.D, SegPos.F, SegPos.G],
  4: [SegPos.B, SegPos.C, SegPos.D, SegPos.F],
  5: [SegPos.A, SegPos.B, SegPos.D, SegPos.F, SegPos.G],
  6: [SegPos.A, SegPos.B, SegPos.D, SegPos.E, SegPos.F, SegPos.G],
  7: [SegPos.A, SegPos.C, SegPos.F],
  8: [SegPos.A, SegPos.B, SegPos.C, SegPos.D, SegPos.E, SegPos.F, SegPos.G],
  9: [SegPos.A, SegPos.B, SegPos.C, SegPos.D, SegPos.F, SegPos.G],
}

type Entry = {
  extra: string[],
  output: string[],
}

type SignalMap = Record<string, number>
type SegmentPossibilities = Record<SegPos, SegPos[]>

const createSegmentPossibilitiesMap = (): SegmentPossibilities => {
  return {
    [SegPos.A]: generate(7, (i) => Object.values(SegPos)[i]),
    [SegPos.B]: generate(7, (i) => Object.values(SegPos)[i]),
    [SegPos.C]: generate(7, (i) => Object.values(SegPos)[i]),
    [SegPos.D]: generate(7, (i) => Object.values(SegPos)[i]),
    [SegPos.E]: generate(7, (i) => Object.values(SegPos)[i]),
    [SegPos.F]: generate(7, (i) => Object.values(SegPos)[i]),
    [SegPos.G]: generate(7, (i) => Object.values(SegPos)[i]),
  };
}

const subtractSegments = (original: SegPos[], subtract: SegPos[]): SegPos[] => {
  return original.filter(segpos => !subtract.includes(segpos));
}

const countHard = (entries: Entry[]): number => {
  let totalSum = 0;

  entries.forEach(entry => {
    const signalMap: SignalMap = {};
    let sum = 0;
    let outputSignals: string[] = entry.output;
    const possibilities: SegmentPossibilities = createSegmentPossibilitiesMap();

    const found = (n: number, signal: string) => {
      const sourceSegments: SegPos[] = NUMBERS_TO_SEGMENTS[n];
      console.log('found', n, signal, sourceSegments);
      signal.split('').forEach(letter => {
        const segment: SegPos = SegPos[letter.toUpperCase()];
        const ruledOut: SegPos[] = subtractSegments(Object.values(SegPos), sourceSegments);
        possibilities[segment] = subtractSegments(possibilities[segment], ruledOut);
      });
    };

    const remaining = entry.extra.filter(signal => {
      if (signal.length === 2) {
        found(1, signal);
        return false;
      }
      if (signal.length === 3) {
        found(7, signal);
        return false;
      }
      if (signal.length === 4) {
        found(4, signal);
        return false;
      }
      if (signal.length === 7) {
        found(8, signal);
        return false;
      }
      return true;
    });

    remaining.forEach(signal => {
      
    });

    console.log(possibilities);
  });

  return totalSum;
}

export const execute = (inputs: string[]): number =>
  countHard(
    inputs
      .map(line => {
        const [signals, output] = line
          .split(' | ')
          .map(part =>
            part
              .split(' ')
              .filter(_ => !!_)
          );
        return { extra: signals, output };
      })
  )