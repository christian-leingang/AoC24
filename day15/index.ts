import {
  dirSteps,
  findPositionInMatrix,
  findPositionInMatrixInLine,
  Position,
} from "../utils/matrixHelper.ts";

function move(
  matrix: string[][],
  robotPos: Position,
  dir: string,
): [string[][], Position] {
  const stepDir = dirSteps[dir] ?? { y: 0, x: 0 };
  const nextPos = { y: robotPos.y + stepDir.y, x: robotPos.x + stepDir.x };
  const nextPosVal = matrix[nextPos.y][nextPos.x];

  if (nextPosVal === "#") return [matrix, robotPos];
  if (nextPosVal === ".") {
    matrix[robotPos.y][robotPos.x] = ".";
    matrix[nextPos.y][nextPos.x] = "@";
    robotPos = nextPos;

    return [matrix, robotPos];
  }

  if (nextPosVal === "O") {
    const nextDot = findPositionInMatrixInLine(
      matrix,
      robotPos,
      stepDir,
      ".",
      "#",
    );
    if (nextDot) {
      matrix[nextDot.y][nextDot.x] = "O";
      matrix[nextPos.y][nextPos.x] = "@";
      matrix[robotPos.y][robotPos.x] = ".";
      robotPos = nextPos;

      return [matrix, nextPos];
    }
  }

  return [matrix, robotPos];
}

function part1(input: string) {
  let result = 0;

  const [map, dirsT] = input.split("\n\n");
  let matrix = map.split("\n").map((line) => line.split(""));
  const dirs = dirsT.split("").filter((el) => el !== "\n");

  let robotPos = findPositionInMatrix(matrix, "@");

  if (!robotPos) return;

  for (const dir of dirs) {
    [matrix, robotPos] = move(matrix, robotPos!, dir);
  }

  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === "O") {
        result += i * 100 + j;
      }
    });
  });

  console.log("Part 1: ", result);
}

function part2(input: string) {
  let result = 0;
  console.log("Lass lieber bleiben:)");
  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").trim();
  part1(lines);
  part2(lines);
}
