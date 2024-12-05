const kv = Deno.readTextFileSync("./kv.txt");
const kvArr = kv.trim().split("\n");
const kvMap = new Map<number, Set<number>>();

for (const pair of kvArr) {
  const [l, r] = pair.split("|").map((x) => parseInt(x));
  const cur = kvMap.get(l);
  if (cur) {
    cur.add(r);
  } else {
    kvMap.set(l, new Set([r]));
  }
}

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
  const seen = new Set();
  for (const item of row) {
    const afterPages = kvMap.get(item) ?? new Set();
    if (seen.intersection(afterPages).size > 0) {
      return false;
    }
    seen.add(item);
  }

  return true;
};

const topologicalSort = (row: number[]) => {
  const inDegree = new Map<number, number>();
  const graph = new Map<number, Set<number>>();

  row.forEach((page) => {
    inDegree.set(page, 0);
    graph.set(page, new Set());
  });

  for (const page of row) {
    const afterPages = kvMap.get(page) ?? new Set();
    afterPages.forEach((afterPage) => {
      if (row.includes(afterPage)) {
        graph.get(page)?.add(afterPage);
        inDegree.set(afterPage, (inDegree.get(afterPage) ?? 0) + 1);
      }
    });
  }

  const queue = [];
  const sorted = [];
  inDegree.forEach((degree, page) => {
    if (degree === 0) queue.push(page);
  });

  while (queue.length > 0) {
    const node = queue.shift()!;
    sorted.push(node);
    graph.get(node)?.forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return sorted;
};

printOrdersArr.forEach((row) => {
  if (!checkValidOrder(row)) {
    const reordered = topologicalSort(row);
    const middle = reordered[Math.floor(reordered.length / 2)];
    total += middle;
  }
});

console.log(total);
