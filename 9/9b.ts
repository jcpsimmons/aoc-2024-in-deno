import { sleep } from "https://deno.land/x/sleep/mod.ts";

const isSampleData = true;

const data = Deno.readTextFileSync(
  isSampleData ? "./sampleData.txt" : "./data.txt",
);
const dataArr = data.trim().split("").map(Number);

let curDataId = 0;
let totalDataInserted = 0;
let disk: (string | number)[] = [];

let isData = true;

// Function to generate new data blocks
const newData = (
  quantity: number,
  content: string | number,
): string | number[] => new Array(quantity).fill(content);

// Create the initial disk state
for (let i = 0; i < dataArr.length; i++) {
  const cur = dataArr[i];
  if (isData) {
    disk = [...disk, ...newData(cur, curDataId)];
    totalDataInserted += cur;
    curDataId++;
  } else {
    disk = [...disk, ...newData(cur, ".")];
  }
  isData = !isData;
}

console.log("inserted ", totalDataInserted);

// Identify files and their positions
const files: { id: number; start: number; end: number; size: number }[] = [];
let currentFileId: number | null = null;
let currentFileStart = 0;

for (let i = 0; i < disk.length; i++) {
  if (typeof disk[i] === "number") {
    if (currentFileId === null) {
      currentFileId = disk[i] as number;
      currentFileStart = i;
    }
  } else {
    if (currentFileId !== null) {
      files.push({
        id: currentFileId,
        start: currentFileStart,
        end: i - 1,
        size: i - currentFileStart,
      });
      currentFileId = null;
    }
  }
}

if (currentFileId !== null) {
  files.push({
    id: currentFileId,
    start: currentFileStart,
    end: disk.length - 1,
    size: disk.length - currentFileStart,
  });
}

// Sort files by decreasing ID
files.sort((a, b) => b.id - a.id);

// Function to find the leftmost span of free space
const findFreeSpace = (size: number): number | null => {
  let currentLength = 0;
  let start = 0;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === ".") {
      if (currentLength === 0) start = i;
      currentLength++;
      if (currentLength >= size) return start;
    } else {
      currentLength = 0;
    }
  }

  return null;
};

// Move files to the leftmost free space
for (const file of files) {
  const freeSpaceIndex = findFreeSpace(file.size);
  if (freeSpaceIndex !== null && freeSpaceIndex < file.start) {
    // Clear the old file position
    for (let i = file.start; i <= file.end; i++) {
      disk[i] = ".";
    }

    // Move the file to the new position
    for (let i = 0; i < file.size; i++) {
      disk[freeSpaceIndex + i] = file.id;
    }

    file.start = freeSpaceIndex;
    file.end = freeSpaceIndex + file.size - 1;

    if (isSampleData) {
      console.clear();
      console.log(disk.join(""));
      await sleep(0.25);
    }
  }
}

// Calculate the checksum
let answer = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i] === ".") {
    continue;
  }
  const product = Number(disk[i]) * i;
  answer += product;
}

console.log(answer);
console.log(disk.join(""));
