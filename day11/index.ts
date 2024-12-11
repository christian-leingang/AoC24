function part1(input: number[]) {
  let beforeStones = input;
  const afterStones = beforeStones.slice();

  for (let blink = 0; blink < 25; blink++) {
    let afterIdx = 0;

    for (const stone of beforeStones) {
      if (stone === 0) {
        afterStones[afterIdx] = 1;
      } else if (stone.toString().length % 2 === 0) {
        const middle = stone.toString().length / 2;
        afterStones.splice(afterIdx, 1, +stone.toString().substring(0, middle));
        afterStones.splice(
          afterIdx + 1,
          0,
          +stone.toString().substring(middle, stone.toString().length),
        );
        afterIdx++;
      } else {
        afterStones[afterIdx] = stone * 2024;
      }
      afterIdx++;
    }
    beforeStones = afterStones.slice();
  }

  console.log("Part 1: ", afterStones.length);
}

function part2(input: number[]) {
  let result = 0;
  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").trim().split(" ").map(Number);
  part1(lines);
  part2(lines);
}
