export type Coordinate = [number, number];

export const coordToStr = (coord: Coordinate): string =>
  `${coord[0]},${coord[1]}`;

export const strToCoord = (str: string): Coordinate =>
  str.split(',').map(_ => parseInt(_, 10)) as Coordinate;

type GetDefaultCallback<V> = (key: Coordinate) => V;

export class CoordinateMap<V> {
  size: number;
  getDefault: GetDefaultCallback<V>;
  defaultValue: V;
  map: Map<string, V> = new Map();

  constructor(size: number, initial?: Record<string, V>, getDefault?: V | GetDefaultCallback<V>) {
    this.size = size;

    if (typeof getDefault === 'function') {
      this.getDefault = getDefault as GetDefaultCallback<V>;
    } else {
      this.defaultValue = getDefault;
    }

    Object.keys(initial || {})
      .forEach(key => {
        this.map.set(key, initial[key]);
      })
  }

  get(key: Coordinate): V {
    const str = coordToStr(key);
    if(this.map.has(str)) {
      return this.map.get(str);
    } else if(this.getDefault) {
      const value = this.getDefault.call(this, key);
      this.map.set(str, value);
      return value;
    } else {
      return this.defaultValue;
    }
  }

  set = (key: Coordinate, value: V) => {
    const str = coordToStr(key);
    this.map.set(str, value);
  }

  has = (key: Coordinate): boolean => {
    const str = coordToStr(key);
    return this.map.has(str);
  }

  toVisualString = (): string => {
    let str = '';
    for(let y = 0; y < this.size; y++) {
      for(let x = 0; x < this.size; x++) {
        str += this.has([x, y]) ? this.get([x, y]) : '-';
      }
      str += '\n';
    }
    return str;
  }

  log = () => {
    for(let y = 0; y < this.size; y++) {
      let str = '';
      for(let x = 0; x < this.size; x++) {
        str += this.has([x, y]) ? this.get([x, y]) : '-';
      }
      console.log(str);
    }
  }
}