import { readdir, writeFile } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const iconsDir = join(__dirname, '..', 'src', '1-shared', 'assets', 'icons');

const entries = await readdir(iconsDir);
const files = entries.filter(
  (file) => file.endsWith('.tsx') || file.endsWith('.ts'),
);

const exports = files
  .map((file) => {
    const name = basename(file, extname(file));
    return `export { default as ${name}UIIcon } from "./${name}";`;
  })
  .join('\n');

await writeFile(join(iconsDir, 'index.ts'), `${exports}\n`);

function extname(file) {
  const i = file.lastIndexOf('.');
  return i === -1 ? '' : file.slice(i);
}
