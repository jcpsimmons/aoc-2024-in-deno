import { reports } from "./data.ts";

let safeReports = 0;

console.log(reports.length);

for (const report of reports) {
  const arr = report.split(" ").map((x) => parseInt(x));
  let maxes = 0;
  let mins = 0;
  let brokenRule = false;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      maxes++;
    }

    if (arr[i] < arr[i - 1]) {
      mins++;
    }

    const diff = Math.abs(arr[i] - arr[i - 1]);

    if (diff < 1 || diff > 3) {
      brokenRule = true;
      break;
    }
  }
  if (brokenRule) continue;

  if (maxes == arr.length - 1 || mins == arr.length - 1) {
    if (maxes == arr.length - 1) console.log("increasing", arr);
    if (mins == arr.length - 1) console.log("decreasing", arr);
    safeReports++;
  }
}

console.log(safeReports);
