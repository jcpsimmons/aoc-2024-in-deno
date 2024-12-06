import { data } from "./data.ts";

const gridArray = data.split("\n").map((row) => row.split(""));
let matches = 0;

const directions = [
  {
    pattern: [
      [-1, -1, "M"],
      [1, 1, "S"],
    ],
    reverse: [
      [-1, -1, "S"],
      [1, 1, "M"],
    ],
  },
  {
    pattern: [
      [-1, 1, "M"],
      [1, -1, "S"],
    ],
    reverse: [
      [-1, 1, "S"],
      [1, -1, "M"],
    ],
  },
];

for (let row = 1; row < gridArray.length - 1; row++) {
  for (let col = 1; col < gridArray[0].length - 1; col++) {
    if (gridArray[row][col] !== "A") continue;

    const hasMatchingDiagonals = directions.every(({ pattern, reverse }) =>
      [pattern, reverse].some((diagonal) =>
        diagonal.every(
          ([dRow, dCol, char]) => gridArray[row + dRow]?.[col + dCol] === char,
        ),
      ),
    );

    if (hasMatchingDiagonals) matches++;
  }
}

console.log(matches);
