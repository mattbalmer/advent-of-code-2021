import rfdc from '../utils/rfdc';

const parseLine = (line: string): number[] =>
  line
    .replace(/\s+/g, ',')
    .split(',')
    .filter(_ => Boolean(_))
    .map(_ => parseInt(_))

export type Board = number[][];

export type BoardInput = {
  numbers: number[],
  boards: Board[],
}

export const parse = (lines: string[]): BoardInput => {
  const numbers: number[] = parseLine(lines[0]);
  const boards: Board[] = [];
  let board: Board;

  for(let i = 2; i <= lines.length; i++) {
    const line = parseLine(lines[i] || '');
    if (line.length === 0) {
      boards.push(board);
      board = null;
    } else if(board) {
      board.push(line);
    } else {
      board = [line];
    }
  }

  return rfdc({
    numbers,
    boards,
  })
}