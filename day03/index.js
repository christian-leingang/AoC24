function part1(input) {
  let result = 0;
  const regex = /mul\((\d+),(\d+)\)/g;

  input.foreach(line => {
    let matches;
    while ((matches = regex.exec(line)) !== null) {
      let [_, a, b] = matches;
      result += Number(a) * Number(b);
    }
  })

  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;
  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}