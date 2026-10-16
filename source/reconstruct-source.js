const fs = require('fs');
const path = require('path');

const root = __dirname;
const chunks = path.join(root, 'chunks', 'electron');
const out = path.join(root, 'electron');
fs.mkdirSync(out, { recursive: true });

for (const name of ['main.js','managedTweaks.js','tweaks.js','tweakScripts.js']) {
  const parts = fs.readdirSync(chunks)
    .filter(f => f.startsWith(name + '.part'))
    .sort();
  if (!parts.length) continue;
  const data = parts.map(f => fs.readFileSync(path.join(chunks, f), 'utf8')).join('');
  fs.writeFileSync(path.join(out, name), data, 'utf8');
  console.log(`Rebuilt ${name} from ${parts.length} part(s)`);
}

console.log('Done. Smaller source files are stored directly under source/electron/.');
