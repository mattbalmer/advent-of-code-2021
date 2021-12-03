export const power = (inputs: string[]): number => {
  const counts = Array.from({ length: inputs[0].length }, () => 0);

  inputs.forEach(line => {
    const bits = line.split('');
    bits.forEach((bit, i) => {
      if(bit === '1') {
        counts[i] += 1;
      }
    });
  });

  const bits = counts.map(count => count >= (inputs.length / 2) ? 1 : 0);
  const gamma = parseInt(bits.join(''), 2);
  const epsilon = parseInt(bits.map(_ => _ === 0 ? 1 : 0).join(''), 2);

  return gamma * epsilon;
}