function checkCorrectUpdateOrder(update, rules) {
  return !update.some((number, i) =>
    rules.some(
      ([a, b]) =>
        (a == number && update.indexOf(b) < i && update.indexOf(b) !== -1) || (b == number && update.indexOf(a) > i)
    )
  );
}

function correctUpdate(update, rules) {
  for (let i = 0; i < update.length; i++) {
    const number = update[i];
    for (let j = 0; j < rules.length; j++) {
      const [a, b] = rules[j];
      const idxA = update.indexOf(a);
      const idxB = update.indexOf(b);
      if (a == number && idxB < i && idxB !== -1) {
        update.splice(idxA, 1);
        update.splice(idxA + 1, 0, a);
        return update;
      }
      if (b == number && idxA > i) {
        update.splice(idxA, 1);
        update.splice(idxA - 1, 0, a);
        return update;
      }
    }
  }
  return update;
}

function processInput(input) {
  const [rulesArr, updatesArr] = input.split('\n\n');
  const rules = rulesArr.split('\n').map((el) => el.split('|').map(Number));
  const updates = updatesArr.split('\n').map((el) => el.split(',').map(Number));
  return { rules, updates };
}

function part1(input) {
  const { rules, updates } = processInput(input);

  const result = updates.reduce((acc, update) => {
    return acc + (checkCorrectUpdateOrder(update, rules) ? update[Math.floor(update.length / 2)] : 0);
  }, 0);

  console.log('Part 1: ', result);
}

function part2(input) {
  const { rules, updates } = processInput(input);

  const wrongUpdates = updates.filter((update) => !checkCorrectUpdateOrder(update, rules));

  const correctedUpdates = wrongUpdates.map((update) => {
    let round = 0;
    while (!checkCorrectUpdateOrder(update, rules) && round < 1000) {
      round++;
      update = correctUpdate(update, rules);
    }
    return update;
  });

  const result = correctedUpdates.reduce((acc, wUpdate) => acc + wUpdate[Math.floor(wUpdate.length / 2)], 0);

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = input.replace(/\r/g, '');
  part1(lines);
  part2(lines);
}
