import { sleep } from "https://deno.land/x/sleep/mod.ts";

const isTest = true;
const isViz = true;
const FRAME_RATE = 0.05;

const file = isTest ? "./sampleData.txt" : "./data.txt";

const contents = Deno.readTextFileSync(file);
const [board, moves] = contents.split("\n\n");
const boardState = board.split("\n").map((row) => row.split(""));
const moveList = moves
  .split("")
  .map((move) => move.trim())
  .filter(Boolean);

let robotState = { x: 0, y: 0 };

for (let y = 0; y < boardState.length; y++) {
  for (let x = 0; x < boardState[0].length; x++) {
    if (boardState[y][x] == "@") {
      robotState = { x, y };
    }
  }
}

const dirs: { [key: string]: number[] } = {
  "^": [-1, 0],
  ">": [0, 1],
  "<": [0, -1],
  v: [1, 0],
};

let boxes = 0;
for (const move of moveList) {
  const [yMov, xMov] = dirs[move];
  const looker = { y: robotState.y + yMov, x: robotState.x + xMov };
  const moveBoxes: number[][] = [];
  let skip = false;

  while (boardState[looker.y][looker.x] != ".") {
    const char = boardState[looker.y][looker.x];
    if (char == "#") {
      skip = true;
      break;
    }

    // it has to be a box
    moveBoxes.push([looker.y, looker.x]);
    looker.y += yMov;
    looker.x += xMov;
  }

  // we hit a wall immediately or after contiguous boxes
  if (skip) {
    if (isViz) {
      // log hit a wall in RED
      console.log(`\%cHIT WALL`, "color: red");
      await sleep(FRAME_RATE * 2);
    }
    continue;
  }

  // remove robot
  boardState[robotState.y][robotState.x] = ".";

  // move boxes from inside out
  for (let i = 0; i < moveBoxes.length; i++) {
    const [curBoxY, curBoxX] = moveBoxes[i];
    const newBoxY = curBoxY + yMov;
    const newBoxX = curBoxX + xMov;
    // remove old location
    boardState[newBoxY][newBoxX] = "O";
  }

  // update robot state
  robotState.x += xMov;
  robotState.y += yMov;
  boardState[robotState.y][robotState.x] = "@";

  if (isViz) {
    console.clear();
    console.log(boardState.map((r) => r.join("")).join("\n"));
    await sleep(FRAME_RATE);
  }
}

const boxPositions = boardState.reduce((acc, row, y) => {
  row.forEach((cell, x) => {
    if (cell == "O") {
      acc.push([y, x]);
    }
  });
  return acc;
}, []);

let answer = 0;

for (const box of boxPositions) {
  const [y, x] = box;
  const gps = 100 * y + x;
  answer += gps;
}

console.log(answer);
