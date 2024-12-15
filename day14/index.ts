function parseInput(lines: string[]) {
  return lines.map((line) => {
    const [pPart, vPart] = line.split(" ");
    const pos = pPart.slice(2).split(",").map(Number);
    const v = vPart.slice(2).split(",").map(Number);
    return { pos, v };
  });
}

function part1(input: string[]) {
  const arr = parseInput(input);

  const width = 101;
  const height = 103;

  for (let i = 0; i < 100; i++) {
    arr.forEach((el) => {
      el.pos[0] = (el.pos[0] + el.v[0] + width) % width;
      el.pos[1] = (el.pos[1] + el.v[1] + height) % height;
    });
  }

  const halfWidth = Math.trunc(width / 2);
  const halfHeight = Math.trunc(height / 2);

  const quadrants = [0, 0, 0, 0];
  arr.forEach((el) => {
    if (el.pos[0] < halfWidth && el.pos[1] < halfHeight) quadrants[0]++;
    if (el.pos[0] < halfWidth && el.pos[1] > halfHeight) quadrants[1]++;
    if (el.pos[0] > halfWidth && el.pos[1] < halfHeight) quadrants[2]++;
    if (el.pos[0] > halfWidth && el.pos[1] > halfHeight) quadrants[3]++;
  });

  const result = quadrants.reduce((acc, cur) => acc * cur, 1);

  console.log("Part 1: ", result);
}

function part2(input: string[]) {
  const arr = parseInput(input);

  const width = 101;
  const height = 103;

  for (let i = 0; i < 10000; i++) {
    const curMap: string[][] = Array.from(
      { length: height },
      () => Array(width).fill(" "),
    );
    arr.forEach((el) => {
      curMap[el.pos[0]][el.pos[1]] = "1";
      el.pos[0] = (el.pos[0] + el.v[0] + width) % width;
      el.pos[1] = (el.pos[1] + el.v[1] + height) % height;
    });

    console.log("Iteration", i);
    console.log(curMap.map((line) => line.join("")));
  }
}

export default function run(input: string) {
  const lines = [...input.replace(/\r/g, "").trim().split("\n")];
  part1(lines);
  part2(lines);
}
