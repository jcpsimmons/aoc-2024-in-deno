const data = Deno.readTextFileSync("./data.txt");
const stones = data.trim().split(" ").map(Number);
console.log(stones);

const cache = new Map<number, number>();

let result = 0;

const maths = (input: number): number[] => {
  if (input === 0) return [1];
  const inputArr = (input + "").split("");
  if (inputArr.length % 2 === 0) {
    const mid = Math.floor(inputArr.length / 2);
    return [inputArr.slice(0, mid).join(""), inputArr.slice(mid).join("")].map(
      Number,
    );
  }
  return [input * 2024];
};

for (const stone of stones) {
  if (cache.has(stone)) {
    result += cache.get(stone)!;
    continue;
  }

  const curStoneArr = [stone];

  for (let i = 0; i < 25; i++) {
    const newStoneArr: number[] = [];
    for (let n = 0; n < curStoneArr.length; n++) {
      newStoneArr.push(...maths(curStoneArr[n]));
    }
    curStoneArr.splice(0, curStoneArr.length, ...newStoneArr);
  }

  const count = curStoneArr.length;
  cache.set(stone, count);
  result += count;
}

console.log(result);
