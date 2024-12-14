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

const getAntinodes = (
  aOne: Antenna,
  aTwo: Antenna,
): { x: number; y: number }[] => {
  const antinodes: { x: number; y: number }[] = [];
  if (aOne.frequency !== aTwo.frequency) return antinodes;
  const dx = aTwo.x - aOne.x;
  const dy = aTwo.y - aOne.y;

  antinodes.push({ x: aOne.x - dx, y: aOne.y - dy });
  antinodes.push({ x: aTwo.x + dx, y: aTwo.y + dy });

  return antinodes;
};

const uniqueAntinodes = new Set<string>();

for (let i = 0; i < antennae.length; i++) {
  for (let j = i + 1; j < antennae.length; j++) {
    const antinodes = getAntinodes(antennae[i], antennae[j]);
    for (const node of antinodes) {
      if (
        node.x >= 0 &&
        node.x < dataArr[0].length &&
        node.y >= 0 &&
        node.y < dataArr.length
      ) {
        uniqueAntinodes.add(`${node.x},${node.y}`);
      }
    }
  }
}

answer = uniqueAntinodes.size;
console.log(answer);
