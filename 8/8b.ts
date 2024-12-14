type Antenna = { x: number; y: number; frequency: string };

const data = Deno.readTextFileSync("./data.txt");
const lines = data.trim().split("\n");
const dataArr = lines.map((line) => line.trim().split(""));

let answer = 0;
const antennae: Antenna[] = [];

for (let i = 0; i < dataArr.length; i++) {
  for (let j = 0; j < dataArr[i].length; j++) {
    const val = dataArr[i][j];
    if (val !== ".") {
      antennae.push({ x: j, y: i, frequency: val });
    }
  }
}

const uniqueAntinodes = new Set<string>();

for (let i = 0; i < antennae.length; i++) {
  uniqueAntinodes.add(`${antennae[i].x},${antennae[i].y}`);
  for (let j = i + 1; j < antennae.length; j++) {
    if (antennae[i].frequency === antennae[j].frequency) {
      const dx = antennae[j].x - antennae[i].x;
      const dy = antennae[j].y - antennae[i].y;
      let x = antennae[i].x;
      let y = antennae[i].y;
      while (x >= 0 && x < dataArr[0].length && y >= 0 && y < dataArr.length) {
        uniqueAntinodes.add(`${x},${y}`);
        x += dx;
        y += dy;
      }
      x = antennae[i].x - dx;
      y = antennae[i].y - dy;
      while (x >= 0 && x < dataArr[0].length && y >= 0 && y < dataArr.length) {
        uniqueAntinodes.add(`${x},${y}`);
        x -= dx;
        y -= dy;
      }
    }
  }
}

answer = uniqueAntinodes.size;
console.log(answer);
