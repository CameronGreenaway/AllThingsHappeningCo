/*
  Generates a poster (thumbnail) JPEG for every .mp4 in public/images.
  Needed because mobile browsers (iOS/Android Safari) don't render a
  preview frame from <video preload="metadata"> alone — they require an
  explicit `poster` image, unlike desktop browsers.

  Run with: node scripts/generate-video-posters.mjs
*/
import ffmpegPath from 'ffmpeg-static';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { readdir } from 'fs/promises';
import path from 'path';

const execFileAsync = promisify(execFile);
const DIR = path.resolve('public/images');

const files = (await readdir(DIR)).filter(f => f.toLowerCase().endsWith('.mp4'));

for (const file of files) {
  const input = path.join(DIR, file);
  const output = path.join(DIR, file.replace(/\.mp4$/i, '-poster.jpg'));
  await execFileAsync(ffmpegPath, [
    '-y', '-i', input,
    '-ss', '00:00:01',
    '-frames:v', '1',
    '-vf', 'scale=800:-1',
    '-q:v', '4',
    output,
  ]);
  console.log(`${file} -> ${path.basename(output)}`);
}

if (files.length === 0) console.log('No .mp4 files found in public/images.');
