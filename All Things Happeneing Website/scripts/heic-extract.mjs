// Extract the primary image from an iPhone HEIC (grid of HEVC tiles) by
// rebuilding an Annex-B stream ffmpeg can decode, then stitching the tiles.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const SRC = process.argv[2];
const OUT = process.argv[3];
const WORK = process.argv[4];

const b = fs.readFileSync(SRC);

function boxes(start, end) {
  const r = [];
  let o = start;
  while (o + 8 <= end) {
    let sz = b.readUInt32BE(o);
    const t = b.subarray(o + 4, o + 8).toString('latin1');
    let hdr = 8;
    if (sz === 1) { sz = Number(b.readBigUInt64BE(o + 8)); hdr = 16; }
    if (sz < 8) break;
    r.push({ t, o, sz, body: o + hdr, end: o + sz });
    o += sz;
  }
  return r;
}

const top = boxes(0, b.length);
const meta = top.find(x => x.t === 'meta');
const inner = boxes(meta.body + 4, meta.end);
const find = (t) => inner.find(x => x.t === t);

// ── pitm: primary item id ──
const pitm = find('pitm');
const pitmVer = b[pitm.body];
const primaryId = pitmVer === 0 ? b.readUInt16BE(pitm.body + 4) : b.readUInt32BE(pitm.body + 4);

// ── iinf: item id -> type ──
const iinf = find('iinf');
const itemType = {};
for (const k of boxes(iinf.body + 6, iinf.end)) {
  if (k.t !== 'infe') continue;
  itemType[b.readUInt16BE(k.body + 4)] = b.subarray(k.body + 8, k.body + 12).toString('latin1');
}

// ── iloc: item id -> bytes ──
const iloc = find('iloc');
const idat = find('idat');
const locs = {};
{
  let p = iloc.body;
  const version = b[p]; p += 4;
  const b1 = b[p], b2 = b[p + 1]; p += 2;
  const offSize = b1 >> 4, lenSize = b1 & 15, baseSize = b2 >> 4;
  const idxSize = (version === 1 || version === 2) ? (b2 & 15) : 0;
  let count;
  if (version < 2) { count = b.readUInt16BE(p); p += 2; } else { count = b.readUInt32BE(p); p += 4; }
  const rd = (n) => { let v = 0; for (let i = 0; i < n; i++) v = v * 256 + b[p + i]; p += n; return v; };
  for (let i = 0; i < count; i++) {
    let id;
    if (version < 2) { id = b.readUInt16BE(p); p += 2; } else { id = b.readUInt32BE(p); p += 4; }
    let ctype = 0;
    if (version === 1 || version === 2) { ctype = b.readUInt16BE(p) & 15; p += 2; }
    p += 2;
    const base = rd(baseSize);
    const n = b.readUInt16BE(p); p += 2;
    const parts = [];
    for (let j = 0; j < n; j++) {
      if (idxSize) rd(idxSize);
      const off = rd(offSize), len = rd(lenSize);
      const from = ctype === 1 ? idat.body : 0;
      parts.push(b.subarray(from + base + off, from + base + off + len));
    }
    locs[id] = Buffer.concat(parts);
  }
}

// ── iref: grid -> tile ids (dimg) ──
const iref = find('iref');
let tileIds = [];
{
  const ver = b[iref.body];
  const idB = ver === 0 ? 2 : 4;
  const rdId = (o) => idB === 2 ? b.readUInt16BE(o) : b.readUInt32BE(o);
  for (const r of boxes(iref.body + 4, iref.end)) {
    if (r.t !== 'dimg') continue;
    const from = rdId(r.body);
    if (from !== primaryId) continue;
    const n = b.readUInt16BE(r.body + idB);
    for (let i = 0; i < n; i++) tileIds.push(rdId(r.body + idB + 2 + i * idB));
  }
}

// ── grid geometry ──
const g = locs[primaryId];
const flags = g[1];
const rows = g[2] + 1, cols = g[3] + 1;
const wide = flags & 1;
const outW = wide ? g.readUInt32BE(4) : g.readUInt16BE(4);
const outH = wide ? g.readUInt32BE(8) : g.readUInt16BE(6);
console.log(`primary=${primaryId} type=${itemType[primaryId]} grid=${cols}x${rows} out=${outW}x${outH} tiles=${tileIds.length}`);

// ── hvcC for the tiles, resolved through ipma (a file can carry several) ──
const iprp = find('iprp');
const ipco = boxes(iprp.body, iprp.end).find(x => x.t === 'ipco');
const props = boxes(ipco.body, ipco.end); // 1-indexed by property_index
const ipma = boxes(iprp.body, iprp.end).find(x => x.t === 'ipma');

const propsOf = (itemId) => {
  let p = ipma.body;
  const version = b[p];
  const flags = b.readUInt32BE(p) & 0xffffff;
  p += 4;
  const count = b.readUInt32BE(p); p += 4;
  for (let i = 0; i < count; i++) {
    let id;
    if (version < 1) { id = b.readUInt16BE(p); p += 2; } else { id = b.readUInt32BE(p); p += 4; }
    const n = b[p]; p += 1;
    const idx = [];
    for (let j = 0; j < n; j++) {
      if (flags & 1) { idx.push(b.readUInt16BE(p) & 0x7fff); p += 2; }
      else { idx.push(b[p] & 0x7f); p += 1; }
    }
    if (id === itemId) return idx.map(i => props[i - 1]).filter(Boolean);
  }
  return [];
};

const hvcC = propsOf(tileIds[0]).find(x => x.t === 'hvcC');
if (!hvcC) throw new Error('no hvcC for tile item ' + tileIds[0]);

// irot on the primary item tells us how to rotate the stitched result
const irotProp = propsOf(primaryId).find(x => x.t === 'irot');
const rotate = irotProp ? (b[irotProp.body] & 3) * 90 : 0;
console.log('irot', rotate + '°');

// hvcC -> Annex-B parameter sets
const AB = Buffer.from([0, 0, 0, 1]);
function paramSets() {
  let p = hvcC.body + 22;
  const numArrays = b[p]; p += 1;
  const out = [];
  for (let i = 0; i < numArrays; i++) {
    p += 1;
    const numNal = b.readUInt16BE(p); p += 2;
    for (let j = 0; j < numNal; j++) {
      const len = b.readUInt16BE(p); p += 2;
      out.push(AB, b.subarray(p, p + len)); p += len;
    }
  }
  return Buffer.concat(out);
}
const lengthSize = (b[hvcC.body + 21] & 3) + 1;
const ps = paramSets();

// length-prefixed NALs -> Annex-B
function toAnnexB(buf) {
  const out = [];
  let p = 0;
  while (p + lengthSize <= buf.length) {
    let len = 0;
    for (let i = 0; i < lengthSize; i++) len = len * 256 + buf[p + i];
    p += lengthSize;
    out.push(AB, buf.subarray(p, p + len));
    p += len;
  }
  return Buffer.concat(out);
}

// One stream: parameter sets + every tile as its own IDR picture
const stream = Buffer.concat([ps, ...tileIds.map(id => toAnnexB(locs[id]))]);
const h265 = path.join(WORK, 'tiles.h265');
fs.writeFileSync(h265, stream);

fs.rmSync(path.join(WORK, 'tiles'), { recursive: true, force: true });
fs.mkdirSync(path.join(WORK, 'tiles'), { recursive: true });
execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-f', 'hevc', '-i', h265,
  path.join(WORK, 'tiles', 'tile_%03d.png')]);

const frames = fs.readdirSync(path.join(WORK, 'tiles')).sort();
console.log('decoded tiles:', frames.length);
if (frames.length !== tileIds.length) throw new Error(`expected ${tileIds.length} tiles, got ${frames.length}`);

const tw = (await sharp(path.join(WORK, 'tiles', frames[0])).metadata()).width;
const th = (await sharp(path.join(WORK, 'tiles', frames[0])).metadata()).height;
console.log('tile size', tw + 'x' + th);

const composite = frames.map((f, i) => ({
  input: path.join(WORK, 'tiles', f),
  left: (i % cols) * tw,
  top: Math.floor(i / cols) * th,
}));

const stitched = await sharp({ create: { width: cols * tw, height: rows * th, channels: 3, background: '#000' } })
  .composite(composite)
  .extract({ left: 0, top: 0, width: Math.min(outW, cols * tw), height: Math.min(outH, rows * th) })
  .png()
  .toBuffer();

// irot is anti-clockwise; sharp rotates clockwise
await sharp(stitched).rotate(rotate ? 360 - rotate : 0).jpeg({ quality: 92 }).toFile(OUT);

console.log('wrote', OUT, (fs.statSync(OUT).size / 1024 / 1024).toFixed(2) + 'MB');
