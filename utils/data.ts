import * as fs from 'fs';
import * as path from 'path';

const getFilePath = (day: number, prefix: string, set?: number): string => {
  const filename = `${prefix}${set ? `-${set}` : ''}.txt`;
  const dirName = `day-${day < 10 ? `0${day}` : day}`
  return path.resolve(__dirname, '..', dirName, filename);
}

export const parseData = (content: string): string[] => {
  return content.split('\n');
}

export const getRealData = (day: number, set?: number): string[] => {
  const filename = getFilePath(day, 'data', set);
  const raw = fs.readFileSync(filename, 'utf8');
  return parseData(raw);
}

export const getTestData = (day: number, set?: number): string[] => {
  const filename = getFilePath(day, 'data-test', set);
  const raw = fs.readFileSync(filename, 'utf8');
  return parseData(raw);
}

type IGetData = {
  (day: number): {
    DATA?: string[],
    TEST_DATA: string[],
  }
  <T = string>(day: number, map: (line: string, i: number) => T): {
    DATA?: T[],
    TEST_DATA: T[],
  }
}
export const getData: IGetData = (day, map?) => {
  let TEST_DATA = getTestData(day);
  if (map) {
    TEST_DATA = TEST_DATA.map(map);
  }
  if (fs.existsSync(getFilePath(day, 'data'))) {
    let DATA = getRealData(day);
    if (map) {
      DATA = DATA.map(map);
    }
    return {
      TEST_DATA,
      DATA
    }
  } else {
    return {
      TEST_DATA,
      DATA: null,
    }
  }
}

export const extractDay = (dirname: string): number => {
  return parseInt(dirname.split('/').slice(-1)[0].replace('day-', ''))
}