import { PositionType } from "../utils/matrixHelper.ts";

type Machine = {
  a: PositionType;
  b: PositionType;
  p: PositionType;
};

function parseInput(machines: string[]): Machine[] {
  return machines.map((el) => {
    const [a, b, price] = el.split("\n");
    const [ax, ay] = a.match(/\d+/g)?.map(Number) ?? [0, 0];
    const [bx, by] = b.match(/\d+/g)?.map(Number) ?? [0, 0];
    const [px, py] = price.match(/\d+/g)?.map(Number) ?? [0, 0];

    return {
      a: { x: ax, y: ay },
      b: { x: bx, y: by },
      p: { x: px, y: py },
    };
  });
}

function getPressesToWin(machine: Machine) {
  const { a, b, p } = machine;
  const bCount = (a.x * p.y - a.y * p.x) / (a.x * b.y - a.y * b.x);
  const aCount = (p.x - b.x * bCount) / a.x;

  if (
    aCount % 1 === 0 &&
    p.x === aCount * a.x + bCount * b.x && p.y === aCount * a.y + bCount * b.y
  ) {
    return aCount * 3 + bCount;
  }
  return 0;
}

function part1(machines: string[]) {
  const machinesArr = parseInput(machines);

  const result = machinesArr.reduce(
    (acc, cur) => acc + getPressesToWin(cur),
    0,
  );

  console.log("Part 1: ", result);
}

function part2(machines: string[]) {
  const machinesArr = parseInput(machines).map((machine) => {
    machine.p.x += 10000000000000;
    machine.p.y += 10000000000000;
    return machine;
  });

  const result = machinesArr.reduce(
    (acc, cur) => acc + getPressesToWin(cur),
    0,
  );
  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = [...input.replace(/\r/g, "").trim().split("\n\n")];
  part1(lines);
  part2(lines);
}
