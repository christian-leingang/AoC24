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

function isSafeReport(levels){
  let safe = true;
  let firstdiff = levels[1] - levels[0];

  console.log(levels);
  for (let i = 1; i < levels.length; i++) {
    let diff = levels[i] - levels[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3 || (firstdiff * diff <= 0)) {
      safe = false;
      break;
    }
  }
  return safe;
}   


function part2(input) {
  let result = 0;

  for (let report of input) {
    let levels = report.split(' ').map(Number);
    let safe = isSafeReport(levels);

    if(!safe){
      for(let i = 0; i < levels.length; i++){
        let temp = [...levels];
        temp.splice(i, 1);
        safe = isSafeReport(temp);
        if(safe){
          break;
        }
      }
    }

    if (safe) result++;
  }    

  console.log('Part 2: ', result);
}

export default function run(input) {
  const lines = [...input.replace(/\r/g, '').trim().split('\n')];
  part1(lines);
  part2(lines);
}
