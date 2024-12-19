const contents = Deno.readTextFileSync("./sampleData.txt");

type Point = { x: number; y: number };
type Node = {
  pos: Point;
  dir: Direction;
  cost: number;
  steps: number; // Track how many steps we've taken
};

enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

// Directions corresponding to North, East, South, West
const DIR_OFFSETS: { [key in Direction]: [number, number] } = {
  [Direction.North]: [-1, 0],
  [Direction.East]: [0, 1],
  [Direction.South]: [1, 0],
  [Direction.West]: [0, -1],
};

const board = contents.split("\n").map((line) => line.split(""));

// Find the start and end points
const findPosition = (char: string): Point => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === char) return { x, y };
    }
  }
  throw new Error(`Character ${char} not found on the board.`);
};

const start = findPosition("S");
const end = findPosition("E");

const lowestWinningScore = 0

:wq

