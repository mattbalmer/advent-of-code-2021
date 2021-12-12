import * as fs from 'fs';
import * as path from 'path';

export const parseData = (content: string): string[] => {
  return content.split('\n').filter(line => !line.startsWith('//'));
}

export const getRealData = (day: string): string[] => {
  const raw = fs.readFileSync(path.resolve(__dirname, '..', `${day}`, 'data.txt'), 'utf8');
  return parseData(raw);
}

export const getTestData = (day: string): string[] => {
  const raw = fs.readFileSync(path.resolve(__dirname, '..', `${day}`, 'data-test.txt'), 'utf8');
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
  const dirName = `day-${day < 10 ? `0${day}` : day}`
  let TEST_DATA = getTestData(dirName);
  if (map) {
    TEST_DATA = TEST_DATA.map(map);
  }
  if (fs.existsSync(path.resolve(__dirname, '..', dirName, 'data.txt'))) {
    let DATA = getRealData(dirName);
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