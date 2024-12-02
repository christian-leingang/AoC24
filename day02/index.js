function part1(input) {
  let result = 0;

  for (let report of input) {
    let levels = report.split(' ').map(Number);
    let validReport = true;
    let lastLvl = levels[0];
    let increasing = levels[0] < levels[1];
    for (let i = 1; i < levels.length; i++) {
      let curLvl = levels[i];
      if (((curLvl > lastLvl && increasing) || (curLvl < lastLvl && !increasing)) && Math.abs(curLvl - lastLvl) < 4) {
        lastLvl = curLvl;
        continue;
      } else {
        validReport = false;
      }
    }
    if (validReport) result++;
  }
  console.log('Part 1: ', result);
}

function part2(input) {
  let result = 0;

  for (let report of input) {
    let levels = report.split(' ').map(Number);
    let mistakes = 0;
    let lastLvl = levels[0];
    let increasing = levels[0] < levels[1];
    console.log(levels);
    for (let i = 1; i < levels.length; i++) {
      let curLvl = levels[i];
      if (((curLvl > lastLvl && increasing) || (curLvl < lastLvl && !increasing)) && Math.abs(curLvl - lastLvl) < 4) {
        lastLvl = curLvl;
        continue;
      } else {
        mistakes++;
        console.log('Got a mistake. Now:', mistakes);
        if (mistakes < 2) {
          levels.splice(i, 1);
          console.log(levels);
          i--;
          continue;
        } else {
          console.log('false');
          break;
        }
      }
    }
    if (mistakes <= 1) result++;
  }

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
