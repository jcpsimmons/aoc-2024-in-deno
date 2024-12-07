const input = Deno.readTextFileSync("./data.txt");

// parse input
const equations = input
  .trim()
  .split("\n")
  .map((line) => {
    const [target, nums] = line.split(": ");
    return { target: +target, numbers: nums.split(" ").map(Number) };
  });

const operate = (value: number, num: number, op: string): number => {
  if (op === "+") {
    return value + num;
  }

  if (op === "*") {
    return value * num;
  }

  // elseish case for ||
  return +(value.toString() + num);
};

const sendIt = (
  nums: number[],
  target: number,
  operators: string[],
): boolean => {
  // check everything
  return nums
    .slice(1)
    .reduce(
      (results, num) => {
        // prev,cur
        const newResults: number[] = [];
        results.forEach((val) =>
          operators.forEach((operator) =>
            newResults.push(operate(val, num, operator)),
          ),
        );
        return newResults;
      },
      [nums[0]], // number 1 is what it is
    )
    .includes(target);
};

const calculate = (operators: string[]): number => {
  let total = 0;

  for (const { target, numbers } of equations) {
    if (sendIt(numbers, target, operators)) {
      total += target;
    }
  }

  return total;
};

// part 1
console.log(calculate(["+", "*"]));
// 2
console.log(calculate(["+", "*", "||"]));
