import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'content.js', 'script.js']) await copyFile(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
console.log('Static site ready: dist/index.html');
