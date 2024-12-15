export function printMatrix(matrix: string[][]) {
  matrix.forEach((row) => console.log(row.join("")));
}

export function findPositionInMatrix(
  matrix: string[][],
  target: string,
): { x: number; y: number } | null {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === target) {
        return { y: y, x: x };
      }
    }
  }
  return null;
}

export function findPositionInMatrixInLine(
  matrix: string[][],
  startPos: { x: number; y: number },
  dir: { x: number; y: number },
  target: string,
  end: string,
): { x: number; y: number } | null {
  let { x, y } = startPos;

  while (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
    if (matrix[y][x] === end) return null;
    if (matrix[y][x] === target) {
      return { x, y };
    }
    x += dir.x;
    y += dir.y;
  }

  return null;
}

export const dirSteps: { [key: string]: { y: number; x: number } } = {
  "^": { y: -1, x: 0 },
  "v": { y: 1, x: 0 },
  "<": { y: 0, x: -1 },
  ">": { y: 0, x: 1 },
};

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
