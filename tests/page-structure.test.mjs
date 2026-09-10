import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /<html lang="en">/);
assert.match(html, /How to Speak/);
assert.match(html, /Unzc731iCUY/);

for (const section of [
  "Concise Summary",
  "Timeline",
  "Key Ideas",
  "Actionable Takeaways",
]) {
  assert.match(html, new RegExp(section));
}

assert.doesNotMatch(html, /[\u3400-\u9fff]/, "expected no Chinese characters in the page");

const timestampLinks = html.match(/youtube\.com\/watch\?v=Unzc731iCUY&amp;t=\d+s/g) ?? [];
assert.ok(timestampLinks.length >= 10, "expected at least 10 timestamp links");

const actionItems = html.match(/class="action-item"/g) ?? [];
assert.ok(actionItems.length >= 6, "expected actionable takeaways");
