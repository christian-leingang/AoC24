import {
  getIntersectionTwoArrays,
  getMatrix,
  getSurroundings,
  Position,
} from "../utils/matrixHelper.ts";

const memo = new Map();
let areaId = 0;

function dfs(
  el: string,
  curPos: Position,
  matrix: string[][],
  visited: Set<string>,
  currentArea: string,
) {
  const posKey = `${curPos.x},${curPos.y}`;
  if (visited.has(posKey)) return;
  visited.add(posKey);

  const surroundings = getSurroundings(curPos);
  const curItems = memo.get(currentArea);

  if (curItems) {
    if (getIntersectionTwoArrays(curItems, surroundings).length === 0) {
      areaId++;
      currentArea = `${el}_${areaId}`;
    }
    memo.set(currentArea, [...curItems, curPos]);
  } else {
    memo.set(currentArea, [curPos]);
  }

  for (const surround of surroundings) {
    if (
      surround.x < 0 || surround.x >= matrix.length ||
      surround.y < 0 || surround.y >= matrix[0].length
    ) continue;
    if (matrix[surround.x][surround.y] === el) {
      dfs(el, surround, matrix, visited, currentArea);
    }
  }
}

function part1(matrix: string[][]) {
  let result = 0;
  const visited = new Set<string>();

  for (const [lineNo, line] of matrix.entries()) {
    for (const [colNo, el] of line.entries()) {
      const curPos = new Position(lineNo, colNo);
      if (!visited.has(`${curPos.x},${curPos.y}`)) {
        const currentArea = `${el}_${areaId}`;
        dfs(el, curPos, matrix, visited, currentArea);
        areaId++;
      }
    }
  }

  memo.forEach((val: Position[], key: string) => {
    let perimeter = 0;
    val.forEach((pos) => {
      const surroundings = getSurroundings(pos);
      const filteredArray = getIntersectionTwoArrays(surroundings, val);
      perimeter += 4 - filteredArray.length;
    });
    console.log(key, val.length, perimeter);
    result += val.length * perimeter;
  });

  console.log("Part 1: ", result);
}

function part2(matrix: string[][]) {
  let total_price = 0;
  console.log("Part 2: ", total_price);
}

export default function run(input: string) {
  const matrix = getMatrix(input);
  part1(matrix);
  part2(matrix);
}
