const text = await Deno.readTextFile("1/data.txt");
const arr = text.split("\n").filter(Boolean);

const llist = [];
const rlist = [];

for (const item of arr) {
  const [l, r] = item.split("   ");
  llist.push(parseInt(l));
  rlist.push(parseInt(r));
}

llist.sort();
rlist.sort();

let total = 0;

for (let i = 0; i < llist.length; i++) {
  const result = Math.abs(llist[i] - rlist[i]);
  total += result;
}

console.log(total);
