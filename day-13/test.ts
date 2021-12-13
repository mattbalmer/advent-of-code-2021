import { it } from 'mocha';
import { expect } from 'chai';
import { getData } from '../utils/data';
import * as part1 from './part1';

const { TEST_DATA, DATA } = getData(
  13
);

describe(`Day 13`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 17;
      const result = part1.execute(TEST_DATA, 1);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.execute(DATA, 1);

      console.log('wtf8', result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
        const expected = 16;
      const result = part1.execute(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.execute(DATA);

      console.log(result);
    });
  });
});