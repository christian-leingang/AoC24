function option1(num: number): number {
  let result = num * 64;
  result = (result ^ num) >>> 0;
  return result % 16777216;
}

function option2(num: number): number {
  let result = Math.floor(num / 32);
  result = (result ^ num) >>> 0;
  return result % 16777216;
}

function option3(num: number): number {
  let result = num * 2048;
  result = (result ^ num) >>> 0;
  return result % 16777216;
}

function part1(input: number[]) {
  console.log(input);
  let result = 0;
  input.forEach((secretNumber) => {
    for (let round = 0; round < 2000; round++) {
      secretNumber = option1(secretNumber);
      secretNumber = option2(secretNumber);
      secretNumber = option3(secretNumber);
    }
    console.log(secretNumber);
    result += secretNumber;
  });

  console.log("Part 1: ", result);
}

function part2(input: number[]) {
  let result = 0;
  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").trim().split("\n").map(Number);
  part1(lines);
  part2(lines);
}
