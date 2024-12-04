[LANGUAGE: Javascript]

That was surprisingly easy. Just a few for loops and a basic brutal approach.

Part 1

for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            words.push([data[i][j], data[i][j+1], data[i][j+2], data[i][j+3]]);
            if(data[i+3]) {
                words.push([data[i][j], data[i+1][j], data[i+2][j], data[i+3][j]]);
                words.push([data[i][j], data[i+1][j+1], data[i+2][j+2], data[i+3][j+3]]);
                words.push([data[i][j], data[i+1][j-1], data[i+2][j-2], data[i+3][j-3]]);
            }
        }
    }

    part1 = words.filter(word => (word.join("") === "XMAS" || word.join("") === "SAMX")).length;
Only a single condition needed, as going out of bounds is fine in JS (it will just be undefined, which is not an issue here), but trying to access an index on it again would obviously cause an error.

Part 2

for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(data[i][j] === "A") {
                if(data[i-1] && data[i+1]) {
                    const top = data[i-1][j-1] + data[i-1][j+1];
                    const bot = data[i+1][j-1] + data[i+1][j+1];

                    if(top === "MS" && bot === "MS" 
                        || top === "SM" && bot === "SM" 
                        || top === "SS" && bot === "MM"
                        || top === "MM" && bot === "SS"
                    ) {
                        part2++;
                    }
                }
            }
        }
}