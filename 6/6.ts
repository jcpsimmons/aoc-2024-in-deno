import { sleep } from "https://deno.land/x/sleep/mod.ts";

const grid = Deno.readTextFileSync("./sampleData.txt")
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const curLocation = { x: 0, y: 0 };

for (let i = 0; i < grid.length; i++) {
  for (let n = 0; n < grid[i].length; n++) {
    if (grid[i][n] === "^") {
      curLocation.y = i;
      curLocation.x = n;
      break;
    }
  }
}

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let curDirection = 0;
const visited = new Set();

visited.add(`${curLocation.y},${curLocation.x}`);
grid[curLocation.y][curLocation.x] = "X";

while (true) {
  const [yDir, xDir] = DIRECTIONS[curDirection];
  const nextY = curLocation.y + yDir;
  const nextX = curLocation.x + xDir;

  if (!grid?.[nextY]?.[nextX]) break;

  if (grid[nextY][nextX] === "#") {
    curDirection = (curDirection + 1) % DIRECTIONS.length;
    continue;
  }

  curLocation.y = nextY;
  curLocation.x = nextX;

  visited.add(`${curLocation.y},${curLocation.x}`);
  grid[curLocation.y][curLocation.x] = "X";

  await sleep(0.25);
  console.clear();
  console.log(grid.map((row) => row.join(" ")).join("\n"));
  console.log("Distinct positions visited:", visited.size);
}
