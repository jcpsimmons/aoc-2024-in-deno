const text = await Deno.readTextFile("1/data.txt");
const arr = text.split("\n").filter(Boolean);

const llist = [];
const rlist = [];

for (const item of arr) {
  const [l, r] = item.split("   ");
  llist.push(parseInt(l));
  rlist.push(parseInt(r));
}

const freq = new Map();
rlist.forEach((item) => {
  if (freq.has(item)) {
    freq.set(item, freq.get(item) + 1);
  } else {
    freq.set(item, 1);
  }
});

let total = 0;

llist.forEach((item) => {
  if (!freq.has(item)) {
    return;
  }
  total += item * freq.get(item);
});

console.log(total);
