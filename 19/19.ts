import { sleep } from "https://deno.land/x/sleep/mod.ts";
const contents = Deno.readTextFileSync("./data.txt");
const [towels, combos] = contents.trim().split("\n\n");
const towelArr = towels.trim().split(", ");
const comboArr = combos
  .trim()
  .split("\n")
  .map((combo) => combo.trim());

const log = (msg: any | any[]) => console.log(`${msg}\n`);

const start = performance.now();

const cache = new Map<string, boolean>();

const checkCombo = async (combo: string): Promise<boolean> => {
  await sleep(0.25);
  if (!combo.length) {
    console.log("#######COMBO FOUND#######");
    return true;
  }

  if (cache.has(combo)) {
    console.log(`Cache hit for ${combo}: ${cache.get(combo)}`);
    return cache.get(combo) as boolean;
  }

  for (const towel of towelArr) {
    if (combo.startsWith(towel)) {
      const remaining = combo.slice(towel.length);
      const res = await checkCombo(remaining);
      cache.set(combo, res);
      console.log(`${combo} is ${res}`);
      if (res) return true;
    }
  }

  cache.set(combo, false);
  return false;
};

const positives = [];
for (const combo of comboArr) {
  const res = await checkCombo(combo);
  if (res) positives.push(combo);
  log("");
}

const end = performance.now();

log(positives.length);
log(`execution time: ${end - start}ms`);
