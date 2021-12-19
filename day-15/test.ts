import { it } from 'mocha';
import { expect } from 'chai';
import { getData, getTestData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  15
);
const TEST_DATA_2 = getTestData(15, 2);

describe(`Day 15`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 40;
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
      const expected = 315;
      const result = part2.execute(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.execute(DATA);

      console.log(result);
    });
  });
});