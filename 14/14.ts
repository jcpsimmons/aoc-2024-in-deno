import { sleep } from "https://deno.land/x/sleep/mod.ts";

const contents = Deno.readTextFileSync("./data.txt");
const lines = contents.trim().split("\n");
let index = 1;
const robotMoves = new Map<number, number[]>();
const robotPositions = new Map<number, number[]>();

lines.forEach((line) => {
  const [p, v] = line.split(" ");
  const [_pv, pVals] = p.split("=");
  const [_vv, vVals] = v.split("=");
  const [x, y] = pVals.split(",").map(Number);
  const [xMov, yMov] = vVals.split(",").map(Number);
  robotMoves.set(index, [xMov, yMov]);
  robotPositions.set(index, [x, y]);
  index++;
});

const width = 101;
const height = 103;

const mod = (n: number, m: number): number => ((n % m) + m) % m;

const drawBoard = async (
  positions: number[][],
  height: number,
  width: number,
  iter: number,
) => {
  const board: string[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => " "),
  );

  positions.forEach(([x, y]) => {
    board[y][x] = "X";
  });

  let candidate = false;

  const strRows = board.map((row) => {
    const rowStr = row.join("");
    if (rowStr.includes("XXXXXXXXXXXXXXXXX")) {
      candidate = true;
    }
    return rowStr;
  });

  if (candidate) {
    strRows.forEach((row) => {
      console.log(row);
    });
    console.log(iter);
    await sleep(0.5);
  }
};

for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
  await drawBoard(Array.from(robotPositions.values()), height, width, i);

  robotMoves.forEach((value, key) => {
    const [xMov, yMov] = value;
    const [curX, curY] = robotPositions.get(key) as number[];
    const newX = mod(xMov + curX, width);
    const newY = mod(yMov + curY, height);
    robotPositions.set(key, [newX, newY]);
  });
}

const quadrants = new Array(4).fill(0);

robotPositions.forEach(([x, y]) => {
  if (x === Math.floor(width / 2) || y === Math.floor(height / 2)) return;

  if (x < Math.floor(width / 2) && y < Math.floor(height / 2)) quadrants[0]++;
  else if (x > Math.floor(width / 2) && y < Math.floor(height / 2))
    quadrants[1]++;
  else if (x < Math.floor(width / 2) && y > Math.floor(height / 2))
    quadrants[2]++;
  else if (x > Math.floor(width / 2) && y > Math.floor(height / 2))
    quadrants[3]++;
});

console.log(quadrants);
console.log(
  quadrants.reduce((prev, cur) => {
    return prev * cur;
  }, 1),
);
