import { PriorityQueue } from "../utils/priorityQueue.ts";
import {
  findPositionInMatrix,
  getMatrix,
  PositionType,
} from "../utils/matrixHelper.ts";
import { printMatrix, surroundSteps } from "../utils/matrixHelper.ts";

function dijkstra(matrix: string[][], start: PositionType, end: PositionType) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const costs = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const pq = new PriorityQueue<
    { cost: number; x: number; y: number; dir: number; path: PositionType[] }
  >((a, b) => a.cost - b.cost);

  costs[start.y][start.x] = 0;
  pq.enqueue({
    cost: 0,
    x: start.x,
    y: start.y,
    dir: 3,
    path: [{ x: start.x, y: start.y }],
  });

  while (!pq.isEmpty()) {
    const { cost, x, y, dir, path } = pq.dequeue();
    if (x === end.x && y === end.y) return { cost, path };

    for (let i = 0; i < surroundSteps.length; i++) {
      const { x: dx, y: dy } = surroundSteps[i];
      const nx = x + dx;
      const ny = y + dy;
      const newCost = cost + 1 + (dir !== -1 && dir !== i ? 1000 : 0);

      if (
        nx >= 0 && nx < rows && ny >= 0 && ny < cols &&
        matrix[ny][nx] !== "#" && newCost < costs[ny][nx]
      ) {
        costs[ny][nx] = newCost;
        pq.enqueue({
          cost: newCost,
          x: nx,
          y: ny,
          dir: i,
          path: [...path, { x: nx, y: ny }],
        });
      }
    }
  }

  return { cost: -1, path: [] }; // If no path found
}

function part1(matrix: string[][]) {
  const start = findPositionInMatrix(matrix, "S")!;
  const end = findPositionInMatrix(matrix, "E")!;
  const { cost, path } = dijkstra(matrix, start, end);
  console.log("Part 1: ", cost);
}

function part2(input: string[][]) {
  let result = 0;
  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = getMatrix(input);
  part1(lines);
  part2(lines);
}
