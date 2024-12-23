import { PositionType, surroundSteps } from "../utils/matrixHelper.ts";
import { PriorityQueue } from "../utils/priorityQueue.ts";

const SIZE = 71;

function dijkstra(matrix: string[][], start: PositionType, end: PositionType) {
  const costs = Array.from({ length: SIZE }, () => Array(SIZE).fill(Infinity));
  const pq = new PriorityQueue<
    { cost: number; x: number; y: number; path: PositionType[] }
  >((a, b) => a.cost - b.cost);

  costs[start.y][start.x] = 0;
  pq.enqueue({
    cost: 0,
    x: start.x,
    y: start.y,
    path: [{ x: start.x, y: start.y }],
  });

  while (!pq.isEmpty()) {
    const { cost, x, y, path } = pq.dequeue();
    if (x === end.x && y === end.y) return { cost, path };

    for (let i = 0; i < surroundSteps.length; i++) {
      const { x: dx, y: dy } = surroundSteps[i];
      const nx = x + dx;
      const ny = y + dy;
      const newCost = cost + 1;

      if (
        nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE &&
        matrix[ny][nx] !== "#" && newCost < costs[ny][nx]
      ) {
        costs[ny][nx] = newCost;
        pq.enqueue({
          cost: newCost,
          x: nx,
          y: ny,
          path: [...path, { x: nx, y: ny }],
        });
      }
    }
  }

  return { cost: -1, path: [] }; // If no path found
}

function parseInput(input: string[]) {
  const matrix: string[][] = Array.from(
    { length: SIZE },
    () => Array(SIZE).fill("."),
  );

  for (const el of input) {
    const [x, y] = el.split(",").map(Number);
    matrix[y][x] = "#";
  }
  return matrix;
}

function part1(input: string[]) {
  for (let i = 1024; i < input.length; i++) {
    const matrix = parseInput(input.slice(0, i));

    const { cost, path } = dijkstra(matrix, { x: 0, y: 0 }, {
      x: SIZE - 1,
      y: SIZE - 1,
    });
    if (cost === -1) {
      console.log(i);
      break;
    }
  }

  console.log("Part 1: ", "cost");
}

function part2(input: string[]) {
  let result = 0;
  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").trim().split("\n");
  part1(lines);
  part2(lines);
}
