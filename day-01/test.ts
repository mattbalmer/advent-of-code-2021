import { it } from 'mocha';
import { expect } from 'chai';
import { extractDay, getData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';
const DAY = extractDay(__dirname);

const { TEST_DATA, DATA } = getData<number>(
  DAY,
  _ => parseInt(_, 10)
);

describe(`Day ${DAY}`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 7;
      const result = part1.countIncreases(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.countIncreases(DATA);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 5;
      const result = part2.countWindowIncreases(TEST_DATA, 3);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.countWindowIncreases(DATA, 3);

      console.log(result);
    });
  });
});