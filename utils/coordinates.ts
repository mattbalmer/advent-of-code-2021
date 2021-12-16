export type Coordinate = [number, number];

export const coordToStr = (coord: Coordinate): string =>
  `${coord[0]},${coord[1]}`;

export const strToCoord = (str: string): Coordinate =>
  str.split(',').map(_ => parseInt(_, 10)) as Coordinate;

export class CoordinateMap<V> {
  getDefault: (key: Coordinate) => V;
  defaultValue: V;
  map: Map<string, V> = new Map();

  constructor(initial?: Record<string, V>, getDefault?) {
    if (typeof getDefault === 'function') {
      this.getDefault = getDefault;
    } else {
      this.defaultValue = getDefault;
    }

    Object.keys(initial || {})
      .forEach(key => {
        this.map.set(key, initial[key]);
      })
  }

  get = (key: Coordinate): V => {
    const str = coordToStr(key);
    if(this.map.has(str)) {
      return this.map.get(str);
    } else {
      return this.getDefault ? this.getDefault(key) : this.defaultValue;
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
}