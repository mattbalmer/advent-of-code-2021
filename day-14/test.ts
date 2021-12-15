import { it } from 'mocha';
import { expect } from 'chai';
import { getData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  14
);

describe(`Day 14`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 1588;
      const result = part2.execute(TEST_DATA, 10);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.execute(DATA, 10);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 2188189693529;
      const result = part2.execute(TEST_DATA, 40);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.execute(DATA, 40);

      console.log(result);
    });
  });
});