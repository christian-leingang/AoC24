class Guard {
  pos!: { x: number; y: number };
  direction!: number;
  ahead!: { x: number; y: number };
  distinctPos!: boolean[][];
  walking: boolean;
  walkingSteps: number;

  constructor(mapDimensions: [number, number]) {
    this.walking = true;
    this.walkingSteps = 0;
    this.distinctPos = Array.from(
      Array(mapDimensions[0]),
      () => new Array(mapDimensions[1]).fill(false),
    );
  }

  getAhead(direction: number): { x: number; y: number } {
    const directionMap: { [key: number]: { x: number; y: number } } = {
      0: { x: -1, y: 0 },
      90: { x: 0, y: 1 },
      180: { x: 1, y: 0 },
      270: { x: 0, y: -1 },
    };
    return directionMap[direction] || { x: 0, y: 0 };
  }

  walkGuard(map: string[][]) {
    const newX = this.pos.x + this.ahead.x;
    const newY = this.pos.y + this.ahead.y;
    if (newX < 0 || newX >= map.length || newY < 0 || newY >= map[0].length) {
      this.walking = false;
    } else if (map[newX][newY] !== "#") {
      this.pos = { x: this.ahead.x + this.pos.x, y: this.ahead.y + this.pos.y };
      this.distinctPos[this.pos.x][this.pos.y] = true;
      this.walkingSteps++;
    } else {
      this.direction = (this.direction + 90) % 360;
    }
    this.ahead = this.getAhead(this.direction);
  }

  setGuardPosAndDir(map: string[][]) {
    for (let lineIdx = 0; lineIdx < map.length; lineIdx++) {
      const colIdx = map[lineIdx].findIndex((el) =>
        directionMap[el] !== undefined
      );

      if (colIdx !== -1) {
        const dirChar = map[lineIdx][colIdx];
        this.pos = { x: lineIdx, y: colIdx };
        this.direction = directionMap[dirChar];
        this.distinctPos[this.pos.x][this.pos.y] = true;
        this.ahead = this.getAhead(this.direction);
        return;
      }
    }
    console.log("failed");
  }
}

const directionMap: { [key: string]: number } = {
  "^": 0,
  ">": 90,
  "v": 180,
  "<": 270,
};

function part1(input: string[]) {
  const map = input.map((line) => line.split(""));
  const guard = new Guard([map.length, map[0].length]);
  guard.setGuardPosAndDir(map);

  while (guard.walking) {
    guard.walkGuard(map);
  }

  const result = guard.distinctPos.flat().filter(Boolean).length;

  console.log("Part 1: ", result);
}

function part2(input: string[]) {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const map = input.map((line) => line.split(""));
      if (map[i][j] === ".") {
        map[i][j] = "#";
        const guard = new Guard([map.length, map[0].length]);
        guard.setGuardPosAndDir(map);

        while (guard.walking) {
          if (guard.walkingSteps > 10000) {
            result++;
            break;
          }
          guard.walkGuard(map);
        }
      }
    }
  }
  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = [...input.replace(/\r/g, "").trim().split("\n")];
  part1(lines);
  part2(lines);
}
