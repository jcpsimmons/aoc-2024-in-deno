import { data } from "./data.ts";

const dataArr = data.split("\n").map((row) => row.split(""));

let matches = 0;

const DIRECTIONS: number[][] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

const XMAS = "XMAS";

const search = (startY: number, startX: number, direction: number[]) => {
  const [dirY, dirX] = direction;
  let y = startY;
  let x = startX;
  let gathered = "";
  while (XMAS.startsWith(gathered) && gathered.length < XMAS.length) {
    if (!dataArr?.[y]?.[x]) {
      return;
    }

    gathered += dataArr[y][x];
    y += dirY;
    x += dirX;
  }

  if (gathered == XMAS) matches++;

  return;
};

for (let i = 0; i < dataArr.length; i++) {
  for (let n = 0; n < dataArr[i].length; n++) {
    if (dataArr[i][n] == "X") {
      for (const dir of DIRECTIONS) {
        search(i, n, dir);
      }
    }
  }
}

console.log(matches);
