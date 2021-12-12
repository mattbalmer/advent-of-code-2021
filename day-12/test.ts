import { it } from 'mocha';
import { expect } from 'chai';
import { getData, getTestData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  12
);
const TEST_DATA_2 = getTestData(12, 2);
const TEST_DATA_3 = getTestData(12, 3);

describe(`Day 12`, () => {
  describe('part 1', () => {
    it('test case 1', () => {
      const expected = 10;
      const result = part1.execute(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('test case 2', () => {
      const expected = 19;
      const result = part1.execute(TEST_DATA_2);

      expect(result).to.equal(expected);
    });

    it('test case 3', () => {
      const expected = 226;
      const result = part1.execute(TEST_DATA_3);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      console.log('wtf', DATA);
      const result = part1.execute(DATA);

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('test case 1', () => {
      const expected = 36;
      const result = part2.execute(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('test case 2', () => {
      const expected = 103;
      const result = part2.execute(TEST_DATA_2);

      expect(result).to.equal(expected);
    });

    it('test case 3', () => {
      const expected = 3509;
      const result = part2.execute(TEST_DATA_3);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.execute(DATA);

      console.log(result);
    });
  });
});