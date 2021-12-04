import { BoardInput } from './utils';
import { sumBoard } from './part1';

export const sumLastBoard = ({ numbers, boards }: BoardInput): number => {
  const map: Record<number, [number, number, number][]> = {};
  const markedCount: Record<number, {
    completed: boolean,
    rows: number[],
    cols: number[],
  }> = {};
  let remainingBoards = new Set(Array.from({ length: boards.length }, (_, i) => i));

  boards.forEach((board, iBoard) => {
    board.forEach((row, iRow) => {
      row.forEach((cell, iCol) => {
        if (!map[cell]) {
          map[cell] = [];
        }
        map[cell].push([iBoard, iRow, iCol]);
      });
    });
  });

  for(let i = 0; i < numbers.length; i++) {
    const guess = numbers[i];

    const cellData = map[guess];

    for(let c = 0; c < cellData.length; c++) {
      const [iBoard, iRow, iCol] = cellData[c];

      if (markedCount[iBoard]?.completed) {
        continue;
      }

      const size = boards[iBoard].length;

      boards[iBoard][iRow][iCol] = null;

      if (!markedCount[iBoard]) {
        markedCount[iBoard] = {
          completed: false,
          rows: Array.from({ length: size }, () => 0),
          cols: Array.from({ length: size }, () => 0),
        }
      }

      const rowsFilled = markedCount[iBoard].rows[iRow] += 1;
      const colsFilled = markedCount[iBoard].cols[iCol] += 1;

      if (rowsFilled >= size || colsFilled >= size) {
        markedCount[iBoard].completed = true;

        if (remainingBoards.size > 1) {
          remainingBoards.delete(iBoard);
        } else {
          return sumBoard(boards[iBoard]) * guess;
        }
      }
    }
  }
}