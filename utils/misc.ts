export class PriorityQueue<V> {
  list: [number, V][];

  constructor(initial: [number, V][]) {
    this.list = initial;
  }

  insert(score: number, value: V) {
    const i = this.list.findIndex(partial => partial[0] > score);
    this.list.splice(i >= 0 ? i : this.list.length, 0, [score, value]);
  }

  shift() {
    return this.list.shift();
  }

  get length() {
    return this.list.length;
  }

  some(callback: (value: V) => boolean) {
    return this.list.some(([score, val]) => {
      return callback(val);
    });
  }
}