function reverseString(input) {
  return input.split('').reverse().join('');
}

function reverseRegex(input) {
  return new RegExp(reverseString(input.source), input.flags);
}

function scanLineForRegexFrontAndBack(line, regex) {
  let revRegex = reverseRegex(regex);
  let frontwards = [...line.matchAll(regex)].length;
  let backwards = [...line.matchAll(revRegex)].length;
  return frontwards + backwards;
}

function rotateMatrix90(matrix) {
  return matrix.map((_, i) => matrix.map((row) => row[i]).join(''));
}

function diagonalTraversal(array, direction = -45) {
  const rows = array.length;
  const cols = array[0].length;
  const result = [];
  const isDownward = direction === -45;

  for (let k = 0; k < rows + cols - 1; k++) {
    const diagonal = [];

    if (isDownward) {
      for (let i = Math.max(0, k - cols + 1); i <= Math.min(k, rows - 1); i++) {
        const j = k - i;
        diagonal.push(array[i][j]);
      }
    } else {
      for (let i = Math.max(0, k - cols + 1); i <= Math.min(k, rows - 1); i++) {
        const j = cols - 1 - (k - i);
        diagonal.push(array[i][j]);
      }
    }

    if (diagonal.length > 0) {
      result.push(diagonal.join(''));
    }
  }

  return result;
}

function part1(input) {
  let result = 0;
  const regex = /XMAS/g;

  let turned_matrices = [input, rotateMatrix90(input), diagonalTraversal(input, 45), diagonalTraversal(input, -45)];

  turned_matrices.forEach((matrix) =>
    matrix.forEach((line) => {
      result += scanLineForRegexFrontAndBack(line, regex);
    })
  );

  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;

  const matrix = input.map((line) => line.split(''));

  matrix.forEach((line, lineIdx) => {
    line.forEach((char, colIdx) => {
      if (char == 'A' && matrix[lineIdx - 1] && matrix[lineIdx + 1]) {
        const top = matrix[lineIdx - 1][colIdx - 1] + matrix[lineIdx - 1][colIdx + 1];
        const bot = matrix[lineIdx + 1][colIdx - 1] + matrix[lineIdx + 1][colIdx + 1];

        if (
          (top === 'MS' && bot === 'MS') ||
          (top === 'SM' && bot === 'SM') ||
          (top === 'SS' && bot === 'MM') ||
          (top === 'MM' && bot === 'SS')
        ) {
          result++;
        }
      }
    });
  });

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
