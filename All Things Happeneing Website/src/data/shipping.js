/* ─────────────────────────────────────────────────────────────────
   USPS SHIPPING ESTIMATE — DIY Baby Shower Box only

   WHY A TABLE INSTEAD OF THE USPS API
   USPS has a live rates API, but it needs an API key and a
   server-side call: it sends no CORS headers, so a browser request
   is blocked, and putting the key in front-end code would expose
   it. This site is static on GitHub Pages with no backend.

   The box never changes — one 10x10x6 carton, 3 lb, shipped from
   Carnegie PA (15106). With weight and dimensions fixed, the USPS
   price depends on exactly one variable: the zone, which is derived
   from the destination ZIP. So the whole rate table collapses to
   nine numbers and needs no API at all.

   ── VERIFY THESE BEFORE GOING LIVE ──
   1. Zone chart for origin 151:
      https://postcalc.usps.com/DomesticZoneChart
   2. Current Ground Advantage retail price for 3 lb in each zone:
      https://postcalc.usps.com

   The rates below are ESTIMATES for structure, not quoted prices.
   Replace them with the real numbers before taking any orders.
   ───────────────────────────────────────────────────────────────── */

export const SHIP_FROM_ZIP = '15106';

// What the customer is charged per zone (USPS Ground Advantage, 3 lb).
export const ZONE_RATES = {
  1: 9.5, 2: 9.5, 3: 10.3, 4: 11.6, 5: 13.5,
  6: 15.3, 7: 16.6, 8: 17.9, 9: 22.0,
};

// Added to every shipment to cover the carton, filler and label.
// Set to 0 to charge exact postage.
export const HANDLING_FEE = 3.0;

/* Destination ZIP3 ranges → zone, measured from 151 (Pittsburgh).
   Ranges are inclusive and checked in order. Large states that span
   two zones are split. Anything unmatched falls back to UNKNOWN_ZONE. */
const ZONE_RANGES = [
  [150, 154, 1],  // Pittsburgh metro
  [155, 168, 2],  // western + central PA
  [169, 196, 3],  // eastern PA
  [430, 459, 2],  // OH
  [247, 268, 2],  // WV
  [ 70,  89, 3],  // NJ
  [100, 149, 3],  // NY
  [197, 199, 3],  // DE
  [200, 205, 3],  // DC
  [206, 219, 3],  // MD
  [220, 246, 3],  // VA
  [460, 479, 3],  // IN
  [ 10,  29, 4],  // MA / RI
  [ 30,  38, 4],  // NH
  [ 39,  49, 4],  // ME
  [ 50,  59, 4],  // VT
  [ 60,  69, 4],  // CT
  [270, 289, 4],  // NC
  [290, 299, 4],  // SC
  [370, 385, 4],  // TN
  [400, 427, 4],  // KY
  [480, 499, 4],  // MI
  [530, 549, 4],  // WI
  [600, 629, 4],  // IL
  [300, 319, 5],  // GA
  [320, 329, 5],  // north + central FL
  [335, 338, 5],  // Tampa
  [350, 369, 5],  // AL
  [386, 399, 5],  // MS / south GA
  [500, 528, 5],  // IA
  [550, 567, 5],  // MN
  [630, 658, 5],  // MO
  [716, 729, 5],  // AR
  [330, 334, 6],  // Miami / Ft Lauderdale
  [339, 349, 6],  // southwest FL
  [570, 577, 6],  // SD
  [580, 588, 6],  // ND
  [660, 679, 6],  // KS
  [680, 693, 6],  // NE
  [700, 714, 6],  // LA
  [730, 749, 6],  // OK
  [750, 789, 6],  // east TX
  [590, 599, 7],  // MT
  [790, 799, 7],  // west TX
  [800, 816, 7],  // CO
  [820, 831, 7],  // WY
  [840, 847, 7],  // UT
  [870, 884, 7],  // NM
  [832, 838, 8],  // ID
  [850, 865, 8],  // AZ
  [889, 898, 8],  // NV
  [900, 961, 8],  // CA
  [970, 979, 8],  // OR
  [980, 994, 8],  // WA
  [  6,   9, 9],  // PR / VI
  [967, 968, 9],  // HI
  [995, 999, 9],  // AK
];

const UNKNOWN_ZONE = 8; // charge the high side rather than lose money

export function zoneForZip(zip) {
  const z3 = parseInt(String(zip).trim().slice(0, 3), 10);
  if (Number.isNaN(z3)) return null;
  const hit = ZONE_RANGES.find(([lo, hi]) => z3 >= lo && z3 <= hi);
  return hit ? hit[2] : UNKNOWN_ZONE;
}

/* Returns null until a valid 5-digit ZIP is entered, so the UI can
   ask for one instead of guessing a price. */
export function estimateShipping(zip) {
  const clean = String(zip || '').trim();
  if (!/^\d{5}$/.test(clean)) return null;
  const zone = zoneForZip(clean);
  if (!zone) return null;
  const postage = ZONE_RATES[zone];
  return {
    zone,
    postage,
    handling: HANDLING_FEE,
    total: Math.round((postage + HANDLING_FEE) * 100) / 100,
    estimated: true,
  };
}
