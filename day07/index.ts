function generateOperatorCombinations(
  operators: string[],
  operandsLength: number,
): string[][] {
  const result: string[][] = [];

  function helper(current: string[], index: number) {
    if (index === operandsLength - 1) {
      result.push([...current]);
      return;
    }

    for (const operator of operators) {
      helper([...current, operator], index + 1);
    }
  }

  helper([], 0);
  return result;
}

function part1(input: string[]) {
  let result = 0;
  const operators: string[] = ["+", "*"];

  for (const line of input) {
    const testVal = +line.split(":")[0];
    const operands = line.split(":")[1].trim().split(" ").map(Number);

    const combinations: string[][] = generateOperatorCombinations(
      operators,
      operands.length,
    );

    for (const comb of combinations) {
      let tempRes = operands[0];
      for (let j = 0; j < comb.length; j++) {
        if (comb[j] === "+") {
          tempRes = tempRes + operands[j + 1];
        } else if (comb[j] === "*") {
          tempRes = tempRes * operands[j + 1];
        }
      }
      if (tempRes === testVal) {
        result += tempRes;
        break;
      }
    }
  }
  console.log("Part 1: ", result);
}

function part2(input: string[]) {
  let result = 0;
  const operators: string[] = ["+", "*", "|"];

  for (const line of input) {
    const testVal = +line.split(":")[0];
    const operands = line.split(":")[1].trim().split(" ").map(Number);

    const combinations: string[][] = generateOperatorCombinations(
      operators,
      operands.length,
    );

    for (const comb of combinations) {
      let tempRes = operands[0];
      for (let j = 0; j < comb.length; j++) {
        if (comb[j] === "+") {
          tempRes = tempRes + operands[j + 1];
        } else if (comb[j] === "*") {
          tempRes = tempRes * operands[j + 1];
        } else if (comb[j] === "|") {
          tempRes = +`${tempRes}${operands[j + 1]}`;
        }
      }
      if (tempRes === testVal) {
        result += tempRes;
        break;
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
