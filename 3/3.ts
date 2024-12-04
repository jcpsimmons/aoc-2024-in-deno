const text = await Deno.readTextFile("./data.txt");

const regex = /mul\((\d+),(\d+)\)/g;
const results = [...text.matchAll(regex)];
const groupMatches = results.map((r) => {
  const [_, groupOne, groupTwo] = r;
  const product = parseInt(groupOne) * parseInt(groupTwo);
  return product;
});
const sum = groupMatches.reduce((acc, val) => acc + val, 0);
console.log("sum", sum);
