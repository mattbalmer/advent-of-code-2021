import { it } from 'mocha';
import { expect } from 'chai';
import { getData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  8
);

describe(`Day 8`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 26;
      const result = part1.execute(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.execute(DATA);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 61229;
      const result = part2.execute(TEST_DATA);

      expect(result).to.equal(expected);
    });

    // it('should give the real answer', () => {
    //   const result = part2.execute(DATA);
    //
    //   console.log(result);
    // });
  });
});