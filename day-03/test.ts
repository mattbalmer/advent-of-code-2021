import { it } from 'mocha';
import { expect } from 'chai';
import { getData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  3
);

describe(`Day 3`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 198;
      const result = part1.power(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.power(DATA);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 230;
      const result = part2.lifeSupport(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.lifeSupport(DATA);

      console.log(result);
    });
  });
});