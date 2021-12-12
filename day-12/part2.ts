type Vertex = string;
type Edge = [Vertex, Vertex];
type VertexMap = Record<Vertex, Set<Vertex>>;

const buildMap = (edges: Edge[]): VertexMap => {
  const map: VertexMap = {};

  edges.forEach(([v1, v2]) => {
    if (!map[v1]) {
      map[v1] = new Set<Vertex>();
    }
    if (!map[v2]) {
      map[v2] = new Set<Vertex>();
    }
    map[v1].add(v2);
    map[v2].add(v1);
  });

  return map;
}

const countPaths = (map: VertexMap, start: Vertex, end: Vertex, history: Vertex[] = [null]): number => {
  if (start === end) {
    return 1;
  }
  const adjacent: Vertex[] = Array.from(map[start] || []);
  let count = 0;
  adjacent.forEach(vertex => {
    if (vertex === 'start') {
      return;
    }
    if (vertex.toLowerCase() === vertex && history.includes(vertex)) {
      if (history[0] === null) {
        count += countPaths(map, vertex, end, [vertex, ...history.slice(1), start]);
        return;
      } else {
        return;
      }
    }
    count += countPaths(map, vertex, end, [...history, start]);
  });
  return count;
}

const main = (edges: Edge[]): number => {
  const map: VertexMap = buildMap(edges);
  return countPaths(map, 'start', 'end');
}

export const execute = (inputs: string[]): number =>
  main(
    inputs
      .map(_ =>
        _.split('-') as [string, string]
      ),
  )