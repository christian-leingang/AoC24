function reverseString(input) {
  return input.split("").reverse().join("");
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

// function rotateMatrix90(matrix) {
//   return matrix.map((_, i) => matrix.map(row => row[i]).join(""));
// }

function rotateMatrix90(matrix) {
  const n = matrix.length;
  const rotated = Array.from({ length: n }, () => Array(n).fill(''));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - 1 - i] = matrix[i][j];
    }
  }
  return rotated.map(row => row.join(''));
}

function diagonalTraversal(array, direction = -45) {
  const rows = array.length;
  const cols = array[0].length;
  const result = [];
  const isDownward = direction === -45;

  for (let k = 0; k < rows + cols - 1; k++) {
    const diagonal = [];

    // Loop through diagonal elements
    for (
      let i = isDownward ? Math.min(rows - 1, k) : Math.max(0, k - (cols - 1));
      isDownward ? i >= 0 : i < rows;
      isDownward ? i-- : i++
    ) {
      const j = k - i; // Calculate the other index
      if (j >= 0 && j < cols) {
        diagonal.push(array[i][j]);
      }
    }
    result.push(diagonal.join(''));
  }

  return result;
}

function part1(input) {
  let result = 0;
  const regex = /XMAS/g;

  let turned_matrices = [input, rotateMatrix90(input),
    diagonalTraversal(input, 45), diagonalTraversal(input, -45)]

  let count = 0;
  turned_matrices.forEach((matrix => matrix.forEach(
    line => {
      count++;
      result += scanLineForRegexFrontAndBack(line, regex)
    })));
  console.log(count)

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