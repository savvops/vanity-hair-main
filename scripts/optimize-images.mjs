import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Keep CMS originals intact. Build content-addressed thumbnails for each local image.
const root = new URL('../', import.meta.url);
const output = new URL('public/images/optimized/', root);
await mkdir(output, { recursive: true });
await mkdir(new URL('src/generated/', root), { recursive: true });
const manifest = {};
let originalBytes = 0;
let thumbnailBytes = 0;
for (const name of (await readdir(new URL('public/images/', root))).sort()) {
  if (!/\.(jpe?g|png|webp)$/i.test(name) || name.startsWith('.')) continue;
  const data = await readFile(new URL(`public/images/${name}`, root));
  const meta = await sharp(data).metadata();
  const hash = createHash('sha256').update(data).update('webp-q78-v1').digest('hex').slice(0, 12);
  const widths = [...new Set([320, 640, 960, 1440].map(w => Math.min(w, meta.width)))];
  const variants = [];
  for (const width of widths) {
    const file = `${path.parse(name).name}-${hash}-${width}.webp`;
    const target = new URL(file, output);
    try { await stat(target); } catch {
      await sharp(data).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(fileURLToPath(target));
    }
    variants.push({ src: `/images/optimized/${file}`, width });
  }
  manifest[`/images/${name}`] = { width: meta.width, height: meta.height, variants };
  originalBytes += data.length;
  thumbnailBytes += (await stat(new URL(variants[Math.min(1, variants.length - 1)].src.slice(1), new URL('public/', root)))).size;
}
await writeFile(new URL('src/generated/images.json', root), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Images: ${originalBytes.toLocaleString()} original bytes → ${thumbnailBytes.toLocaleString()} bytes at up to 640px.`);
