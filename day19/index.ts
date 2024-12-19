const memo = new Map([["", 1]]);

function dfs(input: string, patterns: string[]): number {
  let count = 0;
  if (memo.has(input)) return memo.get(input)!;
  for (const pattern of patterns) {
    if (input.startsWith(pattern)) {
      count += dfs(input.slice(pattern.length), patterns);
    }
  }
  memo.set(input, count);
  return count;
}

function day19(input: string) {
  const patterns = input.split("\n\n")[0].split(", ");
  const designs = input.split("\n\n")[1].split("\n");

  const pathsCount = designs.map((design) => dfs(design, patterns));

  console.log("Part 1: ", pathsCount.filter(Boolean).length);
  console.log("Part 2: ", pathsCount.reduce((acc, cur) => acc + cur, 0));
}

export default function run(input: string) {
  const lines = input.replace(/\r/g, "").trim();
  day19(lines);
}
