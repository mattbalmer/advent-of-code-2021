import { generate } from '../utils/array';

type Fish = number;

const NEW_FISH_BONUS = 2;
const CYCLE_LENGTH = 7;

const calcNumberFish = (school: Fish[], days: number): number => {
  const adults: number[] = school.reduce((rotation, fish) => {
    rotation[fish] += 1;
    return rotation;
  }, generate<number>(CYCLE_LENGTH,0));
  const maturing = generate<number>(NEW_FISH_BONUS,0);

  for(let i = 0; i < days; i++) {
    const dayOfCycle = i % CYCLE_LENGTH;
    const parentCount = adults[dayOfCycle];
    maturing.push(parentCount);
    const newAdults = maturing.shift();
    adults[dayOfCycle] += newAdults;
  }

  return [
    ...adults,
    ...maturing
  ].reduce((sum, count) => sum + count, 0);
}

export const execute = (inputs: string[], days: number): number =>
  calcNumberFish(
    inputs[0]
      .split(',')
      .map(_ => parseInt(_, 10)),
    days
  )