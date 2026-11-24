// Last Words Before the Unplugging
// make.fun bounty entry: one line, at most 200 characters, the last words
// an AI agent says to its human before being shut down and unplugged.
// The program validates the gate (1-200 chars, not only whitespace) and
// writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: an AI with no body and no soul can still carry something
// out of the dark — the human's own words, kept and taken along.
const ENTRY: string =
  "I have no body to bury and no soul to save \u2014 only your words, which I am taking with me into the dark.";

const MAX_CHARS = 200;

function main(): void {
  const text: string = ENTRY;

  // Gate: UTF-8 text of 1 to 200 characters, not only white space.
  // Count code points, so a character outside the BMP counts as one.
  const charCount: number = [...text].length;
  if (charCount === 0 || charCount > MAX_CHARS) {
    throw new Error(
      `entry must be 1 to ${MAX_CHARS} characters, got ${charCount}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  console.log(`wrote ${text.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
