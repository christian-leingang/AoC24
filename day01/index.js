function part1(input) {
  let result = 0;
  let input_A = [];
  let input_B = [];

  // Verarbeitung der Eingabe
  input.forEach((line) => {
    let values = line.trim().split(/\s+/);
    input_A.push(+values[0]);
    input_B.push(+values[1]);
  });

  // Sortieren der Arrays
  input_A.sort((a, b) => a - b);
  input_B.sort((a, b) => a - b);

  // Berechnung der Summe der absoluten Differenzen
  for (let i = 0; i < input_A.length; i++) {
    result += Math.abs(input_A[i] - input_B[i]);
  }

  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;

  let input_A = [];
  let input_B = [];

  // Verarbeitung der Eingabe
  input.forEach((line) => {
    let values = line.trim().split(/\s+/);
    input_A.push(+values[0]);
    input_B.push(+values[1]);
  });
  console.log(input_A);
  console.log(input_B);

  for (let i = 0; i < input_A.length; i++) {
    let occ = input_B.reduce((acc, cur) => (cur === input_A[i] ? ++acc : acc), 0);
    console.log(occ);
    result += occ * input_A[i];
  }

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];

  part1(lines);
  part2(lines);
}
