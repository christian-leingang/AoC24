import { Position } from "../utils/matrixHelper.ts";

function positionInGrid(pos: Position, maxX: number, maxY: number): boolean {
  return pos.x >= 0 && pos.x < maxX && pos.y >= 0 && pos.y < maxY;
}

function getAntennaMap(input: string[][]): Map<string, Position[]> {
  const antennaMap = new Map();

  input.forEach((line, lineNo) =>
    line.forEach((el, colNo) => {
      if (el !== ".") {
        if (!antennaMap.has(el)) {
          antennaMap.set(el, []);
        }
        antennaMap.get(el).push(new Position(lineNo, colNo));
      }
    })
  );
  return antennaMap;
}

function part1(input: string[][]) {
  const maxX = input.length;
  const maxY = input[0].length;

  const antennaMap = getAntennaMap(input);

  const antidodeSet = new Set<string>();
  antennaMap.forEach((positions) => {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const posA = positions[i];
        const posB = positions[j];

        const diff = new Position(posA.x - posB.x, posA.y - posB.y);
        const pos1 = new Position(posA.x + diff.x, posA.y + diff.y);
        const pos2 = new Position(posB.x - diff.x, posB.y - diff.y);

        if (positionInGrid(pos1, maxX, maxY)) {
          antidodeSet.add(`${pos1.x},${pos1.y}`);
        }

        if (positionInGrid(pos2, maxX, maxY)) {
          antidodeSet.add(`${pos2.x},${pos2.y}`);
        }
      }
    }
  });

  console.log("Part 1: ", antidodeSet.size);
}

function part2(input: string[][]) {
  const maxX = input.length;
  const maxY = input[0].length;

  const antennaMap = getAntennaMap(input);

  const antidodeSet = new Set<string>();
  antennaMap.forEach((positions) => {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const posA = positions[i];
        const posB = positions[j];
        const diff = new Position(posA.x - posB.x, posA.y - posB.y);

        let multi = -100;
        while (multi < 100) {
          const curPos = new Position(
            posA.x + multi * diff.x,
            posA.y + multi * diff.y,
          );
          multi++;
          if (!positionInGrid(curPos, maxX, maxY)) continue;
          antidodeSet.add(`${curPos.x},${curPos.y}`);
        }
      }
    }
  });

  console.log("Part 2: ", antidodeSet.size);
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").split("\n").map((line) =>
    line.split("")
  );

  part1(lines);
  part2(lines);
}
