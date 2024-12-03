import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getInput(dayPath, isTest) {
  const fileName = isTest ? 'input_test.txt' : 'input.txt';
  return readFileSync(resolve(dayPath, fileName), {
    encoding: 'utf-8',
  });
}
const isTest = process.argv[2] === 'test';
const parameter = isTest ? 3 : 2;
let day = process.argv[parameter] || new Date().getDate().toString().padStart(2, '0');
console.log(process.argv);
const input = getInput(`./day${day}/`, isTest);

import(`../day${day}/index.js`).then((module) => {
  module.default(input);
});
