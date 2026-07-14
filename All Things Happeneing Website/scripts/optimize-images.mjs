/*
  One-time image optimizer: resizes photos to a web-friendly max width and
  recompresses them. Photo PNGs are converted to JPEG (much smaller for photos);
  logo PNGs keep their format so transparency survives.

  Run with: node scripts/optimize-images.mjs
*/
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import path from 'path';

const DIR = path.resolve('public/images');
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;

// Photo PNGs to convert to .jpg (references updated in code separately)
const PNG_TO_JPG = new Set(['Baby1.png', 'Baby2.png', 'Baby3.png', 'Tables1.png', 'Tables2.png']);
// Logos: keep PNG (transparency), just resize + compress
const LOGO_PNGS = new Set(['pgh360.png', 'towlogo.png']);

const fmt = (bytes) => (bytes / 1024 / 1024).toFixed(2) + 'MB';

const files = await readdir(DIR);
let totalBefore = 0, totalAfter = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const full = path.join(DIR, file);
  const before = (await stat(full)).size;
  totalBefore += before;

  const tmp = full + '.tmp';
  let outName = file;

  const pipeline = sharp(full).rotate() // bake in EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (PNG_TO_JPG.has(file)) {
    outName = file.replace(/\.png$/i, '.jpg');
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
  } else if (ext === '.png') {
    const width = LOGO_PNGS.has(file) ? 800 : MAX_WIDTH;
    await sharp(full).resize({ width, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 85, palette: true }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
  }

  const after = (await stat(tmp)).size;

  if (after < before) {
    await unlink(full);
    await rename(tmp, path.join(DIR, outName));
    totalAfter += after;
    console.log(`${file} -> ${outName}: ${fmt(before)} -> ${fmt(after)}`);
  } else {
    // Already small enough — keep the original
    await unlink(tmp);
    totalAfter += before;
    console.log(`${file}: kept original (${fmt(before)})`);
  }
}

console.log(`\nTOTAL: ${fmt(totalBefore)} -> ${fmt(totalAfter)}`);
