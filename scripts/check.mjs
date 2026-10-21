import { readFile, access } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
const html = await readFile('index.html', 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|mailto:|tel:)/.test(match[1])) await access(match[1]);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML id');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor ${match[1]}`);
const context = { window: {} };
runInNewContext(await readFile('content.js', 'utf8'), context);
const data = context.window.SITE_CONTENT;
assert.equal(data.articles.length, 8, 'All eight requested articles must be included');
assert.equal(new Set(data.articles.map((article) => article.id)).size, 8);
for (const article of data.articles) {
  assert.ok(['innovation', 'partnership', 'company'].includes(article.category));
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(article.date));
  await access(`assets/news-${article.id}.jpg`);
}
assert.equal(data.articles.find((article) => article.id === 1366).category, 'company');
console.log('PASS: local assets, anchor targets, unique IDs, eight source articles and categories');
