function part1(input) {
  let input_A = [];
  let input_B = [];

  input.forEach((line) => {
    let [a, b] = line.trim().split(/\s+/).map(Number);
    input_A.push(a);
    input_B.push(b);
  });

  input_A.sort();
  input_B.sort();

  let result = input_A.reduce((sum, a, i) => sum + Math.abs(a - input_B[i]), 0);

  console.log('Part 1: ', result);

}

function part2(input) {
  let result = 0;

  let input_A = [];
  let input_B = [];

  input.forEach((line) => {
    let [a, b] = line.trim().split(/\s+/).map(Number);
    input_A.push(a);
    input_B.push(b);
  });

  for (let i = 0; i < input_A.length; i++) {
    let occ = input_B.reduce((acc, cur) => (cur === input_A[i] ? ++acc : acc), 0);
    result += occ * input_A[i];
  }

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];

  part1(lines);
  part2(lines);
}
