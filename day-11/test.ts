import { it } from 'mocha';
import { expect } from 'chai';
import { getData, getTestData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  11
);
const TEST_DATA_2 = getTestData(11, 2);

describe(`Day 11`, () => {
  describe('part 1', () => {
    it('test case 1a', () => {
      const expected = 204;
      const result = part1.execute(TEST_DATA, 10);

      expect(result).to.equal(expected);
    });

    it('test case 1b', () => {
      const expected = 1656;
      const result = part1.execute(TEST_DATA, 100);

      expect(result).to.equal(expected);
    });

    it('test case 2', () => {
      const expected = 9;
      const result = part1.execute(TEST_DATA_2, 2);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.execute(DATA, 100);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 195;
      const result = part2.execute(TEST_DATA, 1000);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.execute(DATA, 10000);

      console.log(result);
    });
  });
});