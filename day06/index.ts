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
    if (direction === 0) return { x: -1, y: 0 };
    else if (direction === 90) return { x: 0, y: 1 };
    else if (direction === 180) return { x: 1, y: 0 };
    else if (direction === 270) return { x: 0, y: -1 };

    return { x: 0, y: 0 };
  }

  walkGuard(map: string[][]) {
    const newX = this.pos.x + this.ahead.x;
    const newY = this.pos.y + this.ahead.y;
    if (newX < 0 || newX >= map.length || newY < 0 || newY >= map[0].length) {
      this.walking = false;
    } else if (
      map[this.pos.x + this.ahead.x][this.pos.y + this.ahead.y] !== "#"
    ) {
      this.pos = { x: this.ahead.x + this.pos.x, y: this.ahead.y + this.pos.y };
      this.distinctPos[this.pos.x][this.pos.y] = true;
      this.walkingSteps++;
    } else {
      this.direction = (this.direction + 90) % 360;
    }
    this.ahead = this.getAhead(this.direction);
  }

  setGuardPosAndDir(map: string[][]) {
    let done = false;
    for (let lineIdx = 0; lineIdx < map.length; lineIdx++) {
      const colIdx = map[lineIdx].findIndex((el) => {
        return directionMap[el] !== undefined;
      });

      const dirChar = map[lineIdx][colIdx];
      if (colIdx !== -1) {
        this.pos = { x: lineIdx, y: colIdx };
        this.direction = directionMap[dirChar];
        this.distinctPos[this.pos.x][this.pos.y] = true;
        this.ahead = this.getAhead(this.direction);
        done = true;
      }
    }
    if (!done) console.log("failed");
  }
}

const directionMap: { [key: string]: number } = {
  "^": 0,
  ">": 90,
  "v": 180,
  "<": 270,
};

function part1(input: string[]) {
  let result = 0;

  const map = input.map((line) => line.split(""));

  const guard = new Guard([map.length, map[0].length]);
  guard.setGuardPosAndDir(map);

  while (guard.walking) {
    guard.walkGuard(map);
  }

  result += guard.distinctPos.reduce(
    (acc, cur) => acc + cur.reduce((acc1, cur1) => acc1 + (cur1 ? 1 : 0), 0),
    0,
  );

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
