import { it } from 'mocha';
import { expect } from 'chai';
import { getData } from '../utils/data';
import * as part1 from './part1';
// import * as part2 from './part2'; // no part 2 needed for this one

const { TEST_DATA, DATA } = getData(
  6
);

describe(`Day 6`, () => {

  describe('part 1', () => {
    it('should work on test case (18 days)', () => {
      const expected = 26;
      const result = part1.execute(TEST_DATA, 18);

      expect(result).to.equal(expected);
    });

    it('should work on test case (80 days)', () => {
      const expected = 5934;
      const result = part1.execute(TEST_DATA, 80);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.execute(DATA, 80);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 26984457539;
      const result = part1.execute(TEST_DATA, 256);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.execute(DATA, 256);

      console.log(result);
    });
  });
});