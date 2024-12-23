const registers: { a: number; b: number; c: number } = { a: 0, b: 0, c: 0 };
let program: number[];
const output: number[] = [];
let insPointer = 0;

function parseInput(input: string[]) {
  [registers.a, registers.b, registers.c] = input[0].split("\n").map((el) =>
    el.split(": ")[1]
  ).map(
    Number,
  );
  program = input[1].split(": ")[1].split(",").map(Number);
}

const comboOps = new Map([
  [0, () => 0],
  [1, () => 1],
  [2, () => 2],
  [3, () => 3],
  [4, () => registers.a],
  [5, () => registers.b],
  [6, () => registers.c],
]);

const operations = new Map([
  [
    0,
    (operand: number) =>
      registers.a = Math.trunc(
        registers.a / Math.pow(2, comboOps.get(operand)!()),
      ),
  ],
  [1, (operand: number) => registers.b = operand ^ registers.b],
  [2, (operand: number) => registers.b = comboOps.get(operand)!() % 8],
  [3, (operand: number) => {
    if (registers.a !== 0) insPointer = operand - 2;
  }],
  [4, (_: number) => registers.b = registers.b ^ registers.c],
  [5, (operand: number) => output.push(comboOps.get(operand)!() % 8)],
  [
    6,
    (operand: number) =>
      registers.b = Math.trunc(
        registers.a / Math.pow(2, comboOps.get(operand)!()),
      ),
  ],
  [
    7,
    (operand: number) =>
      registers.c = Math.trunc(
        registers.a / Math.pow(2, comboOps.get(operand)!()),
      ),
  ],
]);

function part1(input: string[]) {
  parseInput(input);

  while (insPointer < program.length) {
    operations.get(program[insPointer])!(program[insPointer + 1]);
    insPointer += 2;
  }

  console.log("Part 1: ", output?.join(",") ?? "");
}

function part2(input: string[]) {
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").trim().split("\n\n");
  part1(lines);
  part2(lines);
}
