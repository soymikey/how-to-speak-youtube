import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const iconUrl = new URL("../assets/icon.png", import.meta.url);

assert.match(html, /<html lang="en">/);
assert.match(html, /How to Speak/);
assert.match(html, /Unzc731iCUY/);
assert.match(html, /<link rel="icon" type="image\/png" href="assets\/icon\.png" \/>/);
assert.match(html, /<link rel="apple-touch-icon" href="assets\/icon\.png" \/>/);
assert.match(html, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-3534156575856999/);
assert.match(html, /crossorigin="anonymous"/);
assert.ok(existsSync(iconUrl), "expected generated icon asset");

for (const section of [
  "How to Use This Guide",
  "Concise Summary",
  "Timeline",
  "Key Ideas",
  "Speaking Preparation Checklist",
  "Copyable Talk Template",
]) {
  assert.match(html, new RegExp(section));
}

assert.doesNotMatch(html, /[\u3400-\u9fff]/, "expected no Chinese characters in the page");

const timestampLinks = html.match(/youtube\.com\/watch\?v=Unzc731iCUY&amp;t=\d+s/g) ?? [];
assert.ok(timestampLinks.length >= 10, "expected at least 10 timestamp links");

const actionItems = html.match(/class="action-item"/g) ?? [];
assert.ok(actionItems.length >= 10, "expected a fuller speaking checklist");

for (const phrase of [
  "Best for",
  "Before the talk",
  "Opening",
  "During the talk",
  "Slides",
  "Ending",
  "My talk promise",
]) {
  assert.match(html, new RegExp(phrase));
}
