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

const newData = (
  quantity: number,
  content: string | number,
): string | number[] => new Array(quantity).fill(content);

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

// start sorting
let r = disk.length - 1;
let l = 0;
while (r > totalDataInserted - 1 && l < r) {
  const rightEl = disk[r];
  const leftEl = disk[l];
  if (leftEl !== ".") {
    l++;
    continue;
  }

  if (rightEl == ".") {
    r--;
    continue;
  }

  const swap = leftEl;
  disk[l] = disk[r];
  disk[r] = swap;
  l++;
  r--;
  if (isSampleData) {
    console.clear();
    console.log(disk.join(""));
    await sleep(0.5);
  }
}

let answer = 0;

for (let i = 0; i < totalDataInserted; i++) {
  const product = disk[i] * i;
  const oldAnswer = answer;
  answer += product;
  if (isSampleData) {
    console.clear();
    console.log(`${disk[i]} x ${i} + ${oldAnswer} = `);
    console.log("checksum: ", answer);
    await sleep(0.1);
  }
}

console.log(answer);
