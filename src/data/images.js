// Curated architectural photography, sourced from Unsplash (free license).
// Each entry is passed through the `img()` helper so we can request the
// right crop/size from Unsplash's CDN without keeping duplicated files.

const u = (id, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?q=${q}&w=${w}&auto=format&fit=crop`;

export const exteriors = [
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1600585154340-be6161a56a0c',
  'photo-1512917774080-9991f1c4c750',
  'photo-1600210492486-724fe5c67fb0',
  'photo-1757359056339-22968344cce6',
  'photo-1494526585095-c41746248156',
];

export const livingRooms = [
  'photo-1758448755856-01d3add0177b',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1505843513577-22bb7d21e455',
  'photo-1524758631624-e2822e304c36',
];

export const kitchens = [
  'photo-1682888813913-e13f18692019',
  'photo-1493809842364-78817add7ffb',
  'photo-1449844908441-8829872d2607',
];

export const bedrooms = [
  'photo-1522708323590-d24dbb6b0267',
  'photo-1584622650111-993a426fbf0a',
  'photo-1560185127-6ed189bf02f4',
  'photo-1616486338812-3dadae4b4ace',
];

export const bathrooms = [
  'photo-1600566753086-00f18fb6b3ea',
  'photo-1620626011761-996317b8d101',
];

export const cityViews = [
  'photo-1513635269975-59663e0ac1ad',
  'photo-1520986606214-8b456906c813',
  'photo-1529180184525-78f99adb8e98',
];

export const gardens = [
  'photo-1600585154340-be6161a56a0c',
  'photo-1571055107559-3e67626fa8be',
];

export function img(id, w, q) {
  return u(id, w, q);
}

export function pick(arr, i) {
  return arr[i % arr.length];
}
