import { reports } from "./data.ts";

let safeReports = 0;

const generatePerms = (arr: number[]): number[][] => {
  const output = new Array(arr.length + 1).fill(0).map((_) => [...arr]);
  for (let i = 0; i < arr.length; i++) {
    output[i].splice(i, 1);
  }
  return output;
};

const isOneReportSafe = (arrs: number[][]): boolean => {
  for (const arr of arrs) {
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
      return true;
    }
  }
  return false;
};

for (const report of reports) {
  const arr = report.split(" ").map((x) => parseInt(x));
  const perms = generatePerms(arr);
  const isSafe = isOneReportSafe(perms);
  if (isSafe) safeReports++;
}

console.log(safeReports);
