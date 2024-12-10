function walkUp(
  matrix: number[][],
  curVal: number,
  lineIdx: number,
  colIdx: number,
  visited: Set<string>,
): number[][] {
  if (curVal === 9) {
    return [[lineIdx, colIdx]];
  }

  const nextHeight = curVal + 1;
  const positions: number[][] = [];
  const directions = [
    [lineIdx + 1, colIdx],
    [lineIdx - 1, colIdx],
    [lineIdx, colIdx + 1],
    [lineIdx, colIdx - 1],
  ];

  for (const [nextLineIdx, nextColIdx] of directions) {
    if (
      nextLineIdx >= 0 &&
      nextLineIdx < matrix.length &&
      nextColIdx >= 0 &&
      nextColIdx < matrix[0].length
    ) {
      const key = `${nextLineIdx},${nextColIdx}`;
      if (
        matrix.at(nextLineIdx)?.at(nextColIdx) === nextHeight &&
        !visited.has(key)
      ) {
        visited.add(key);
        const newPositions = walkUp(
          matrix,
          nextHeight,
          nextLineIdx,
          nextColIdx,
          visited,
        );
        positions.push(...newPositions);
        visited.delete(key);
      }
    }
  }

  return positions;
}

function part1(input: string[]) {
  const matrix = input.map((line) => line.split("").map(Number));

  let totalScore = 0;

  for (const [lineIdx, line] of matrix.entries()) {
    for (const [colIdx, val] of line.entries()) {
      if (+val === 0) {
        const visited = new Set<string>([`${lineIdx},${colIdx}`]);
        const endPositions = walkUp(matrix, +val, lineIdx, colIdx, visited);
        const uniqueEndPositions = new Set(
          endPositions.map((pos) => pos.toString()),
        );
        console.log(uniqueEndPositions);
        totalScore += uniqueEndPositions.size;
      }
    }
  }

  console.log("Part 1: ", totalScore);
}

function part2(input: string[]) {
  let result = 0;
  const matrix = input.map((line) => line.split("").map(Number));

  let allPositions = new Set<string>();

  for (const [lineIdx, line] of matrix.entries()) {
    for (const [colIdx, val] of line.entries()) {
      if (+val === 0) {
        const visited = new Set<string>([`${lineIdx},${colIdx}`]);
        const pathPositions = walkUp(matrix, +val, lineIdx, colIdx, visited);
        pathPositions.forEach((pos) => allPositions.add(pos.toString()));
        result += pathPositions.length;
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
