import { Board, BoardInput } from './utils';

export const sumBoard = (board: Board): number => {
  return board.reduce((sum, rows) => {
    return sum + rows.reduce((sum, cell) => sum + (cell || 0), 0)
  }, 0)
}

export const boardSum = ({ numbers, boards }: BoardInput): number => {
  for(let i = 0; i < numbers.length; i++) {
    const guess = numbers[i];
    const check = [];
    let winningBoard: number;

    boards.forEach((board, iBoard) => {
      board.forEach((row, iRow) => {
        row.forEach((cell, iCol) => {
          if (cell === guess) {
            row[iCol] = null;
            check.push([iBoard, iRow, iCol]);
          }
        });
      });
    });

    check.forEach(([iBoard, iRow, iCol]) => {
      const size = boards[iBoard].length;
      const rowRemainingCount = boards[iBoard][iRow].filter(num => num !== null).length;
      const colRemainingCount = Array.from({ length: size }, (_, i) => boards[iBoard][i][iCol])
        .filter(num => num !== null).length;

      if (rowRemainingCount === 0 || colRemainingCount === 0) {
        winningBoard = iBoard;
      }
    });

    if (winningBoard !== undefined) {
      return sumBoard(boards[winningBoard]) * guess;
    }
  }
}

export const boardSum2 = ({ numbers, boards }: BoardInput): number => {
  const map: Record<number, [number, number, number][]> = {};
  const markedCount: Record<number, {
    rows: number[],
    cols: number[],
  }> = {};

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
      const size = boards[iBoard].length;

      boards[iBoard][iRow][iCol] = null;

      if (!markedCount[iBoard]) {
        markedCount[iBoard] = {
          rows: Array.from({ length: size }, () => 0),
          cols: Array.from({ length: size }, () => 0),
        }
      }

      const rowsFilled = markedCount[iBoard].rows[iRow] += 1;
      const colsFilled = markedCount[iBoard].cols[iCol] += 1;

      if (rowsFilled >= size || colsFilled >= size) {
        return sumBoard(boards[iBoard]) * guess;
      }
    }
  }
}