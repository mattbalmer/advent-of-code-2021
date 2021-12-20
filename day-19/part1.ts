type ScannerID = string;
type BeaconID = string;
/**
 * [X, Y, Z]
 */
type Point = [number, number, number];
type DistanceMatrix = {
  byIDs: Record<BeaconID, Record<BeaconID, number>>,
  byDistances: Record<number, [BeaconID, BeaconID]>,
};

type Beacon = {
  id: BeaconID,
  coordinates: Point,
};

type Scanner = {
  id: ScannerID,
  beacons: Beacon[],
  distances?: DistanceMatrix,
};

type Edge = [BeaconID, BeaconID];

type SharedEdge = {
  a: Edge,
  b: Edge,
};

type SharedBeacon = {
  a: BeaconID,
  b: BeaconID,
};

type RotationSet = [number, number, number]
type TranslationSet = [number, number, number]

const getDistance = (a: Point, b: Point): number =>
  Math.pow(
    Math.pow(b[0] - a[0], 2) +
    Math.pow(b[1] - a[1], 2) +
    Math.pow(b[2] - a[2], 2),
    0.5
  );

const createDistanceMatrix = (beacons: Beacon[]): DistanceMatrix => {
  const matrix: DistanceMatrix = {
    byIDs: {},
    byDistances: {},
  };

  beacons.forEach(a => {
    matrix.byIDs[a.id] = {};
    beacons.forEach(b => {
      if (a.id === b.id) {
        return;
      }
      const distance = getDistance(a.coordinates, b.coordinates);
      matrix.byIDs[a.id][b.id] = distance;
      if (isNaN(distance)) {
        console.log(`NaN at ${a.id}:${b.id}`, a.coordinates, b.coordinates)
      }
      matrix.byDistances[distance] = [a.id, b.id];
    });
  });

  return matrix;
}

const getSharedEdges = (a: Scanner, b: Scanner): SharedEdge[] => {
  let beacons = [];

  Object
    .keys(b.distances.byDistances)
    .forEach(distance => {
      const aIDs = a.distances.byDistances[distance];
      if (a.distances.byDistances[distance]) {
        beacons.push({
          a: aIDs,
          b: b.distances.byDistances[distance],
        })
      }
    });

  return beacons;
}

const getSharedBeacons = (edges: SharedEdge[]): {
  a: BeaconID,
  b: BeaconID
}[] => {
  const byA: Record<BeaconID, BeaconID[] | BeaconID> = {};

  for(let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    edge.a.forEach(aID => {
      if (!byA[aID]) {
        byA[aID] = [...edge.b];
      } else if (Array.isArray(byA[aID])) {
        byA[aID] = (byA[aID] as BeaconID[]).find(n => edge.b.includes(n));
      }
    });
  }

  return Object
    .keys(byA)
    .reduce((list, aID) => {
      list.push({
        a: aID,
        b: byA[aID],
      });
      return list;
    }, []);
}

const injectSharedBeacons = (a: Scanner, b: Scanner, sharedBeacons: SharedBeacon[]): {
  a: Beacon,
  b: Beacon,
}[] => {
  return sharedBeacons.map(sharedBeacon => {
    return {
      a: a.beacons.find(beacon => beacon.id === sharedBeacon.a),
      b: b.beacons.find(beacon => beacon.id === sharedBeacon.b)
    }
  })
}

const inferRelativeOrientation = (scannerA: Scanner, scannerB: Scanner, sharedBeacons: SharedBeacon[]): RotationSet => {
  // const point1 = { a: scannerA.beacons.find(beacon => beacon.id === sharedBeacons[0].a).coordinate, b: scannerB.beacons.find(beacon => beacon.id === sharedBeacons[0].b).coordinate };
  // const point2 = { a: scannerA.beacons.find(beacon => beacon.id === sharedBeacons[1].a).coordinate, b: scannerB.beacons.find(beacon => beacon.id === sharedBeacons[1].b).coordinate };
  // const point3 = { a: scannerA.beacons.find(beacon => beacon.id === sharedBeacons[2].a).coordinate, b: scannerB.beacons.find(beacon => beacon.id === sharedBeacons[2].b).coordinate };

  const [
    point1,
    point2,
    point3,
  ] = injectSharedBeacons(scannerA, scannerB, sharedBeacons.slice(0, 3))
    .map(beacon => ({ a: beacon.a.coordinates, b: beacon.b.coordinates }));

  const aDistX = [ point1.a[0] - point2.a[0], point2.a[0] - point3.a[0] ];
  const aDistY = [ point1.a[1] - point2.a[1], point2.a[1] - point3.a[1] ];
  const aDistZ = [ point1.a[2] - point2.a[2], point2.a[2] - point3.a[2] ];

  console.log(aDistX, aDistY, aDistZ);

  // todo, [-1, 1], [1, -1] etc mapping to ONE AXIS AT A TIME, once you find the correct orientaiton for an AXIS, lock it in and move to the next?

  const MODS = [
    [1, 1],
    [1,-1],
    [-1,-1],
    [-1,1],
  ];

  for(let x = 0; x < 3; x++) {
    for(let y = 0; y < 3; y++) {
      for(let z = 0; z < 3; z++) {
        if (z === x || z === y || x === y) {
          continue;
        }

        // const xAbs = Math.abs(x);
        // const yAbs = Math.abs(y);
        // const zAbs = Math.abs(z);

        // const xSign = Math.sign(x) || 1;
        // const ySign = Math.sign(y) || 1;
        // const zSign = Math.sign(z) || 1;

        const bDistX = [ point1.b[x] - point2.b[x], point2.b[x] - point3.b[x] ];
        const bDistY = [ point1.b[y] - point2.b[y], point2.b[y] - point3.b[y] ];
        const bDistZ = [ point1.b[z] - point2.b[z], point2.b[z] - point3.b[z] ];

        console.log([x, y, z], bDistX, bDistY, bDistZ)

        const xMatches = JSON.stringify(aDistX.map(Math.abs)) === JSON.stringify(bDistX.map(Math.abs));
        const yMatches = JSON.stringify(aDistY.map(Math.abs)) === JSON.stringify(bDistY.map(Math.abs));
        const zMatches = JSON.stringify(aDistZ.map(Math.abs)) === JSON.stringify(bDistZ.map(Math.abs));

        if (xMatches && yMatches && zMatches) {
          const xSigns = [aDistX[0] / bDistX[0], aDistX[1] / bDistX[1]];
          const ySigns = [aDistY[0] / bDistY[0], aDistY[1] / bDistY[1]];
          const zSigns = [aDistZ[0] / bDistZ[0], aDistZ[1] / bDistZ[1]];
          if (xSigns[0] !== xSigns[1]) {
            throw `X signs do not match`;
          }
          if (ySigns[0] !== ySigns[1]) {
            throw `Y signs do not match`;
          }
          if (zSigns[0] !== zSigns[1]) {
            throw `Z signs do not match`;
          }
          return [
            x * xSigns[0],
            y * ySigns[0],
            z * zSigns[0],
          ]
        }
      }
    }
  }

  return null;
};

const rotatePoint = (point: Point, rotation: RotationSet): Point => {
  // @ts-ignore
  const out: Point = [];
  for(let i = 0; i <= 2; i++) {
    const key = rotation[i];
    const index = Math.abs(key);
    const sign = Object.is(-0, key) ? -1 : Math.sign(key) || 1;
    out.push(point[index] * sign);
  }
  return out;
}

const translatePoint = (point: Point, translation: TranslationSet): Point => {
  return [
    point[0] + translation[0],
    point[1] + translation[1],
    point[2] + translation[2],
  ]
}

const inferTranslation = (scannerA: Scanner, scannerB: Scanner, sharedBeacons: SharedBeacon[], rotation: RotationSet): TranslationSet => {
  const [a, bRaw]: [Point, Point] = injectSharedBeacons(scannerA, scannerB, sharedBeacons.slice(0, 1))
    .map(sharedBeacon => [sharedBeacon.a.coordinates, sharedBeacon.b.coordinates] as [Point, Point])
    [0];

  const b = rotatePoint(bRaw, rotation);

  console.log('infer translation', a, bRaw, b);

  return [
    b[0] - a[0],
    b[1] - a[1],
    b[2] - a[2],
  ]
};

const mergeScanners = (a: Scanner, b: Scanner, sharedBeacons: SharedBeacon[]): Scanner => {
  const rotation = inferRelativeOrientation(
    a,
    b,
    sharedBeacons,
  );

  // sharedBeacons.map(({ a, b}) => scanners[i].beacons.find(beacon => beacon.id === a).coordinate),
  // console.log(`Orientation between scanners ${a.id} & ${b.id}:`, rotation);

  const translation = inferTranslation(
    a,
    b,
    sharedBeacons,
    rotation
  );

  console.log('rotation', rotation);
  console.log('translation', translation);

  const [expected, point] = [
    a.beacons.find(({id}) => id == sharedBeacons[0].a),
    b.beacons.find(({id}) => id == sharedBeacons[0].b),
  ];

  console.log('expected', expected.id, expected.coordinates);
  console.log('actual', point.id, point.coordinates, '->', rotatePoint(point.coordinates, rotation), '->', translatePoint(
    rotatePoint(point.coordinates, rotation),
    translation
  ));

  console.log(JSON.stringify(a.beacons, null, 2));

  const beacons = [
    ...a.beacons,
  ];
  let nextId: number = beacons.length;

  // todo can just filter from shared beacons
  b.beacons.forEach(originalBeacon => {
    const beacon: Beacon = {
      id: `${nextId}`,
      coordinates: translatePoint(
        rotatePoint(originalBeacon.coordinates, rotation),
        translation
      ),
    };

    const match = a.beacons.find(p =>
      beacon.coordinates[0] === p.coordinates[0] &&
      beacon.coordinates[1] === p.coordinates[1] &&
      beacon.coordinates[2] === p.coordinates[2]
    );

    if (!match) {
      nextId += 1;
      beacons.push(beacon);
    } else {
      console.log(`De-dupe! ${originalBeacon}`)
    }
  });

  return {
    id: a.id,
    beacons,
    distances: createDistanceMatrix(beacons),
  };
}

export const main = (scanners_: Scanner[]): number => {
  let scanners: Scanner[] = scanners_.map(scanner => {
    scanner.distances = createDistanceMatrix(scanner.beacons);
    return scanner;
  });

  console.log('totalbeacons', scanners.reduce((count, scanner) => count + scanner.beacons.length, 0));

  while(scanners.length > 1) {
    console.log('new run of scanners', scanners.length);

    for(let i = 0; i < scanners.length; i++) {
      for(let j = 0; j < scanners.length; j++) {
        if (i === j)  {
          continue;
        }
        const a = scanners[i];
        const b = scanners[j];
        if (!a || !b) {
          continue;
        }
        const sharedEdges = getSharedEdges(a, b);
        const sharedBeacons = getSharedBeacons(sharedEdges);
        // console.log(`Edges shared between scanners ${a.id} & ${b.id}:`, sharedEdges.length, sharedEdges);
        // console.log(`Beacons shared between scanners ${a.id} & ${b.id}:`, sharedBeacons.length, sharedBeacons);

        if (sharedBeacons.length >= 12) {
          console.log(`${sharedBeacons.length} shared beacons found. Merging scanners ${a.id} & ${b.id}`);
          const newScanner = mergeScanners(a, b, sharedBeacons);
          console.log('new scanner', newScanner);
          scanners[i] = newScanner;
          scanners[j] = null;
        }
      }
    }

    scanners = scanners.filter(_ => !!_);
  }

  // let source = scanners[0];
  // const unmatched = scanners.slice(1);
  //
  // while (unmatched.length > 0) {
  //   unmatched.forEach(scanner => {
  //     const sharedBeacons = getSharedBeacons(source, scanner);
  //     console.log(`Beacons shared between scanners ${source.id} & ${scanner.id}:`, sharedBeacons);
  //   });
  //   source = unmatched.shift();
  // }

  return scanners[0]?.beacons?.length;
}

export const execute = (inputs: string[]): number => {
  const scanners: Scanner[] = [];
  let iLastScanner = -1;

  for(let i = 0; i < inputs.length; i++) {
    const line = inputs[i].trim();
    if (line.startsWith('---')) {
      scanners.push({
        id: (/\d+/g).exec(line)[0],
        beacons: [],
      });
      iLastScanner = i;
    } else if (line) {
      scanners[scanners.length - 1].beacons.push({
        id: `${i - iLastScanner - 1}`,
        coordinates: line.split(',').map(n => Number(n)) as [number, number, number]
      });
    }
  }

  return main(
    scanners
  )
}
