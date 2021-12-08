import { it } from 'mocha';
import { expect } from 'chai';
import { getData } from '../utils/data';
import * as part1 from './part1';
import * as part2 from './part2';
import * as part3 from './part3';
import { generate } from '../utils/array';

const { TEST_DATA, DATA } = getData(
  7
);

describe(`Day 7`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 37;
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
      const expected = 168;
      const result = part2.execute(TEST_DATA);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.execute(DATA);

      console.log(result);
    });
  });

  describe('part 3', () => {
    it('should give index on test case', () => {
      const expected = 5;
      const result = part3.getIndex(TEST_DATA[0].split(',')
        .map(_ => parseInt(_, 10)),);

      expect(result).to.equal(expected);
    });

    it('should give index on real answer', () => {
      const expected = 488;
      const result = part3.getIndex(DATA[0].split(',')
        .map(_ => parseInt(_, 10)));

      expect(result).to.equal(expected);
    });

    it('should work on test case', () => {
      const expected = 168;
      const result = part3.calcFuel(TEST_DATA[0].split(',')
        .map(_ => parseInt(_, 10)),);

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part3.calcFuel(DATA[0].split(',')
        .map(_ => parseInt(_, 10)));

      expect(result).to.equal(part2.execute(DATA));
    });

    it('should be equal in all static cases', () => {
      const set1 = [1,7,2,3,2,56,43,3,7,1,7,21,6,3,1,6,2,4,5,8,9,43];
      expect(
        part3.calcFuel(set1)
      ).to.deep.equal(
        part2.calcFuel(set1)
      );

      const set2 = [7,1,6,3,514,3,7,2,466,24,3,445,243,123,213,22];
      expect(
        part3.calcFuel(set2)
      ).to.deep.equal(
        part2.calcFuel(set2)
      );
    });

    it('should be equal in all static cases', () => {
      const set1 = generate(100, () => Math.ceil(Math.random() * 500));
      expect(
        part3.calcFuel(set1)
      ).to.deep.equal(
        part2.calcFuel(set1)
      );
    });
  });
});