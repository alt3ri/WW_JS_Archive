"use strict";
function checkInBox(e, c, t, o) {
  const r = (c.X ?? 0) + (e.X ?? 0);
  const n = (c.Y ?? 0) + (e.Y ?? 0);
  const s = (c.Z ?? 0) + (e.Z ?? 0);
  var c = o.X ?? 0;
  var e = o.Y ?? 0;
  var o = o.Z ?? 0;
  const p = t.X ?? 0;
  const u = t.Y ?? 0;
  var t = t.Z ?? 0;
  return !(
    r - c > p ||
    r + c < p ||
    n - e > u ||
    n + e < u ||
    s - o > t ||
    s + o < t
  );
}
function checkInSphere(e, c, t, o) {
  const r = (c.X ?? 0) + (e.X ?? 0);
  const n = (c.Y ?? 0) + (e.Y ?? 0);
  const s = (c.Z ?? 0) + (e.Z ?? 0);
  (c = (t.X ?? 0) - r), (e = (t.Y ?? 0) - n), (t = (t.Z ?? 0) - s);
  return !(o * o < c * c + e * e + t * t);
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.checkInSphere = exports.checkInBox = void 0),
  (exports.checkInBox = checkInBox),
  (exports.checkInSphere = checkInSphere);
// # sourceMappingURL=IShape.js.map
