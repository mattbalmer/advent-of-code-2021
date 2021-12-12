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

const countPaths = (map: VertexMap, start: Vertex, end: Vertex, history: Vertex[] = []): number => {
  if (start === end) {
    return 1;
  }
  const adjacent: Vertex[] = Array.from(map[start] || []);
  let count = 0;
  adjacent.forEach(vertex => {
    if (vertex.toLowerCase() === vertex && history.includes(vertex)) {
      return;
    }
    count += countPaths(map, vertex, end, [...history, start]);
  });
  return count;
}

// this ended up not being necessary, but I kept it for visualization / checking my work
const getPaths = (map: VertexMap, start: Vertex, end: Vertex, history: Vertex[] = []): Vertex[][] => {
  if (start === end) {
    return [[...history, 'end']];
  }
  const adjacent: Vertex[] = Array.from(map[start] || []);
  let paths = [];
  adjacent.forEach(vertex => {
    if (vertex.toLowerCase() === vertex && history.includes(vertex)) {
      return;
    }
    paths = [
      ...paths,
      ...getPaths(map, vertex, end, [...history, start])
    ];
  });
  return paths;
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