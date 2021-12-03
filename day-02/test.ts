import { it } from 'mocha';
import { expect } from 'chai';
import { extractDay, getData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';
const DAY = extractDay(__dirname);

const { TEST_DATA, DATA } = getData(
  DAY
);

describe(`Day ${DAY}`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 150;
      const result = part1.getPosProduct(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.getPosProduct(DATA);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 900;
      const result = part2.getPosProduct(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.getPosProduct(DATA);

      console.log(result);
    });
  });
});