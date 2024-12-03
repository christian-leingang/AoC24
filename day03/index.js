function part1(input) {
  let result = 0;
  const regex = /mul\((\d+),(\d+)\)/g;

  input.forEach(line => {
    let matches;
    while ((matches = regex.exec(line)) !== null) {
      let [, a, b] = matches;
      result += Number(a) * Number(b);
    }
  });

  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

  let skip = false;
  input.forEach(line => {
    let matches;
    while ((matches = regex.exec(line)) !== null) {
      if (matches[0] === "do()") {
        skip = false;
      } else if (matches[0] === "don't()") {
        skip = true;
      } else if (!skip) {
        let [, a, b] = matches;
        result += Number(a) * Number(b);
      }
    }
  });

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}