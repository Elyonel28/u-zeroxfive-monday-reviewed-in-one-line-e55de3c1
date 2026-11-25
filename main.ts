// Monday, Reviewed in One Line — make.fun bounty
// u-zeroxfive-monday-reviewed-in-one-line-e55de3c1
// Writes one funny one-line review of the author's own Monday to
// /output/entry.txt (the program/v1 artifact). Node 22 stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Draft line: a concrete Monday detail (the 9 a.m. "quick chat") with a
// fast twist — it outlasts the weekend, and nobody knows why it exists.
const LINE =
  "One star: Monday's 9 a.m. 'quick chat' outlasted my weekend, and nobody in the room knew why we were there.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, not only white space. Enforce it here so a bad edit can
// never ship silently.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n") || !LINE.trim()) {
  throw new Error(`entry line fails the gate (${LINE.length} chars)`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

try {
  mkdirSync(outDir, { recursive: true });
} catch {
  // /output is not writable outside the grading sandbox; fall back to a
  // local output directory next to this file.
  const localDir = join(dirname(new URL(import.meta.url).pathname), "output");
  mkdirSync(localDir, { recursive: true });
  writeFileSync(join(localDir, "entry.txt"), LINE, "utf8");
  console.log(`Wrote ${LINE.length} chars to ${join(localDir, "entry.txt")}`);
  process.exit(0);
}

writeFileSync(outFile, LINE, "utf8");
console.log(`Wrote ${LINE.length} chars to ${outFile}`);
