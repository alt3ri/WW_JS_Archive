"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SeedRandomUtil = void 0);
class SeedRandomUtil {
  constructor() {
    (this.RJ = 1664525),
      (this.UJ = 1013904223),
      (this.D11 = Math.pow(2, 32)),
      (this.B11 = 0);
  }
  SetSeed(t) {
    this.B11 = t;
  }
  GetFraction() {
    return (
      (this.B11 = (this.RJ * this.B11 + this.UJ) % this.D11),
      this.B11 / this.D11
    );
  }
  SeedRandomRangeInt(t, e) {
    var r = this.GetFraction();
    return Math.min(e, Math.floor(t + r * (e - t + 1)));
  }
  GenerateRandomSequence(e) {
    var r = Array.from(Array(e), (t, e) => e + 1);
    for (let t = e - 1; 0 < t; t--) {
      var s = this.SeedRandomRangeInt(0, t);
      [r[t], r[s]] = [r[s], r[t]];
    }
    return r;
  }
  WeightedRandom(t) {
    if (1 === t.length) return 0;
    var e = [];
    let r = 0;
    for (const i of t) (r += i), e.push(r);
    var s = this.SeedRandomRangeInt(0, r);
    for (let t = 0; t < e.length; t++) if (s < e[t]) return t;
    return t.length - 1;
  }
}
exports.SeedRandomUtil = SeedRandomUtil;
//# sourceMappingURL=SeedRandomUtil.js.map
