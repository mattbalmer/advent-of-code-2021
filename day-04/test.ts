import { it } from 'mocha';
import { expect } from 'chai';
import { getData } from '../utils/data';
import * as utils from './utils';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  4
);

describe(`Day 4`, () => {
  describe('utils', () => {
    it('should extract numbers', () => {
      const expectedNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
      const output = utils.parse(TEST_DATA);

      expect(output.numbers).to.deep.equal(expectedNumbers);
    });

    it('should extract the boards', () => {
      const expectedBoard1 = [
        [22,13,17,11,0],
        [8,2,23,4,24],
        [21,9,14,16,7],
        [6,10,3,18,5],
        [1,12,20,15,19],
      ];
      const expectedBoard2 = [
        [3,15,0,2,22],
        [9,18,13,17,5],
        [19,8,7,25,23],
        [20,11,10,24,4],
        [14,21,16,12,6],
      ];
      const expectedBoard3 = [
        [14,21,17,24,4],
        [10,16,15,9,19],
        [18,8,23,26,20],
        [22,11,13,6,5],
        [2,0,12,3,7],
      ]
      const output = utils.parse(TEST_DATA);

      expect(output.boards.length).to.deep.equal(3);
      expect(output.boards[0]).to.deep.equal(expectedBoard1);
      expect(output.boards[1]).to.deep.equal(expectedBoard2);
      expect(output.boards[2]).to.deep.equal(expectedBoard3);
    });
  });

  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 4512;
      const result = part1.boardSum(utils.parse(TEST_DATA));

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.boardSum(utils.parse(DATA));

      console.log(result);
    });
  });

  describe('part 1 v2', () => {
    it('should work on test case', () => {
      const expected = 4512;
      const result = part1.boardSum2(utils.parse(TEST_DATA));

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part1.boardSum2(utils.parse(DATA));

      console.log(result);
    });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 1924;
      const result = part2.sumLastBoard(utils.parse(TEST_DATA));

      expect(result).to.equal(expected);
    });

    it('should give the real answer', () => {
      const result = part2.sumLastBoard(utils.parse(DATA));

      console.log(result);
    });
  });
});