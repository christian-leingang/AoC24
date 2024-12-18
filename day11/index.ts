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
  let beforeStones = new Map(input.map((num) => [num, 1]));

  let result = 0;

  const afterStones = new Map(beforeStones);

  for (let blink = 0; blink < 75; blink++) {
    for (const [key, val] of beforeStones) {
      if (key === 0) {
        afterStones.set(1, (afterStones.get(1) ?? 0) + val);
      } else if (key.toString().length % 2 === 0) {
        const middle = key.toString().length / 2;
        const firstHalf = +key.toString().substring(0, middle);
        const secondHalf = +key.toString().substring(
          middle,
          key.toString().length,
        );
        afterStones.set(firstHalf, (afterStones.get(firstHalf) ?? 0) + val);
        afterStones.set(secondHalf, (afterStones.get(secondHalf) ?? 0) + val);
      } else {
        afterStones.set(key * 2024, (afterStones.get(key * 2024) ?? 0) + val);
      }
      afterStones.set(key, (afterStones.get(key) ?? 0) - val);
    }
    beforeStones = new Map(afterStones);
  }
  afterStones.forEach((val) => result += val);

  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").trim().split(" ").map(Number);
  part1(lines);
  part2(lines);
}
