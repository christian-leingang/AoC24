function getFileLength(input: (number | null)[], index: number) {
  let length = 1;
  let i = 1;

  while (input[index + i] === input[index]) {
    length++;
    i++;
  }

  i = -1;
  while (input[index - i] === input[index]) {
    length++;
    i--;
  }
  return length;
}

function part1(input: string) {
  const blockArr: (number | null)[] = [];

  let fileId = 0;
  for (let i = 0; i < input.length; i++) {
    const count = +input[i];
    const value = i % 2 === 0 ? fileId++ : null;
    blockArr.push(...Array(count).fill(value));
  }

  const len = blockArr.length;
  for (let i = 0; i < len; i++) {
    const lastIdx = len - i - 1;
    const lastValue = blockArr[lastIdx];
    const firstDotIdx = blockArr.indexOf(null);

    if (firstDotIdx >= lastIdx) break;

    blockArr[firstDotIdx] = lastValue;
    blockArr[lastIdx] = null;
  }

  const result = blockArr.filter((el) => el !== null).map(Number).reduce(
    (acc, cur, idx) => acc + cur * idx,
    0,
  );

  console.log("Part 1: ", result);
}

function part2(input: string) {
  const blockArr: number[] = [];
  let fileId = 0;

  for (let i = 0; i < input.length; i++) {
    const count = +input[i];
    const value = i % 2 === 0 ? fileId++ : -1;
    blockArr.push(...Array(count).fill(value));
  }

  for (let id = fileId - 1; id >= 0; id--) {
    const fileIndices = blockArr.reduce((acc, val, idx) => {
      if (val === id) acc.push(idx);
      return acc;
    }, [] as number[]);

    if (fileIndices.length === 0) continue;

    const fileLength = fileIndices.length;

    for (let i = 0; i <= fileIndices[0] - fileLength; i++) {
      if (blockArr.slice(i, i + fileLength).every((val) => val === -1)) {
        for (let j = 0; j < fileLength; j++) {
          blockArr[i + j] = id;
          blockArr[fileIndices[j]] = -1;
        }
        break;
      }
    }
  }

  console.log(blockArr.join(""));

  const result = blockArr.reduce(
    (acc, cur, idx) => acc + (cur === -1 ? 0 : cur * idx),
    0,
  );

  console.log("Part 2: ", result);
}

export default function run(input: string) {
  const line = input.replace(/\r/g, "").trim();
  part1(line);
  part2(line);
}
