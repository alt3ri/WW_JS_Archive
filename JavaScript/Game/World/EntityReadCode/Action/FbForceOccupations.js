"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbForceOccupations = void 0);
class FbForceOccupations {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.sEh = !1),
      (this.aEh = void 0),
      (this.hEh = !1),
      (this.lEh = void 0);
  }
  static Create(t) {
    if (t) return new FbForceOccupations(t);
  }
  get OccupationType() {
    return (
      this.sEh ||
        ((this.sEh = !0), (this.aEh = this.FbDataInternal.occupationType())),
      this.aEh
    );
  }
  get Occupations() {
    if (!this.hEh) {
      (this.hEh = !0), (this.lEh = new Array());
      var s = this.FbDataInternal.occupationsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.lEh.push(this.FbDataInternal.occupations(t));
    }
    return this.lEh;
  }
}
exports.FbForceOccupations = FbForceOccupations;
//# sourceMappingURL=FbForceOccupations.js.map
