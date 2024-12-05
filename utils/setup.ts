import { existsSync } from 'https://deno.land/std@0.224.0/fs/exists.ts';

// Get the current day of the month
const day = new Date().getDate().toString().padStart(2, '0');

// Create the directory
const dir = `./day${day}`;
if (!existsSync(dir)) {
  Deno.mkdirSync(dir);
}

// Create the input files
await Deno.writeTextFileSync(`${dir}/input.txt`, '');
await Deno.writeTextFileSync(`${dir}/input_test.txt`, '');

// Create the index.ts file
const code = `
function part1(input: string[]) {
  let result = 0;
  console.log('Part 1: ', result);
}

function part2(input: string[]) {
  let result = 0;
  console.log('Part 2: ', result);
}

export default function run(input: string) {
  const lines = [...input.replace(/\\r/g, '').trim().split('\\n')];
  part1(lines);
  part2(lines);
}
`;

await Deno.writeTextFileSync(`${dir}/index.ts`, code.trim());

console.log('Setup complete.');
