const text = await Deno.readTextFile("./data.txt");

// const text = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

let enabled = true;
let product = 0;

const regex = /(mul\((\d+),(\d+)\))|do\(\)|don't\(\)/g;
const results = [...text.matchAll(regex)];

for (const result of results) {
  const [match, _, lmult, rmult] = result;
  if (match == "do()") {
    enabled = true;
  } else if (match == "don't()") {
    enabled = false;
  } else if (enabled) {
    console.log("\n", match);
    console.log(lmult, rmult);
    product += parseInt(lmult) * parseInt(rmult);
  }
}

console.log(product);
