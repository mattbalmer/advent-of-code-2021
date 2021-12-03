export enum Commonality {
  MOST = 'MOST',
  LEAST = 'LEAST',
}

export const getCommonSequence = (inputs: string[], commonality: Commonality, pos: number = 0): string => {
  if (inputs.length === 1) {
    return inputs[0];
  }
  if (pos >= inputs[0].length) {
    throw `Position too large`
  }

  const ones = [];
  const zeroes = [];

  inputs.forEach(input => {
    if (input[pos] === '1') {
      ones.push(input);
    } else {
      zeroes.push(input);
    }
  });

  const nextSet = ones.length >= zeroes.length
    ? commonality === Commonality.MOST ? ones : zeroes
    : commonality === Commonality.MOST ? zeroes : ones;
  return getCommonSequence(nextSet, commonality, pos + 1);
}

export const lifeSupport = (inputs: string[]): number => {
  const oxygen = parseInt(getCommonSequence(inputs, Commonality.MOST), 2);
  const co2 = parseInt(getCommonSequence(inputs, Commonality.LEAST), 2);

  return oxygen * co2;
}