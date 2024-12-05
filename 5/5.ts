const kv = Deno.readTextFileSync("./kv.txt");
const kvArr = kv.trim().split("\n");
const kvMap = new Map<number, Set<number>>();

for (const pair of kvArr) {
  const [l, r] = pair.split("|").map((x) => parseInt(x));
  const cur = kvMap.get(l);
  if (cur) {
    // don't need to reassign since it's by reference
    cur.add(r);
  } else {
    kvMap.set(l, new Set([r]));
  }
}

// console.log(kvMap);

const printOrders = Deno.readTextFileSync("./printOrders.txt");
const printOrdersArr = printOrders
  .trim()
  .split("\n")
  .map((r) => {
    const row = r.split(",");
    return row.map((c) => parseInt(c));
  });

let total = 0;

const checkValidOrder = (row: number[]) => {
  let seen = new Set();
  for (const item of row) {
    const afterPages = kvMap.get(item) ?? new Set();
    if (seen.intersection(afterPages).size > 0) {
      return;
    }
    seen.add(item);
  }

  const middle = row[Math.floor(row.length / 2)];
  total += middle;
};

printOrdersArr.forEach(checkValidOrder);

console.log(total);
