"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractSectorRange = void 0);
class FbInteractSectorRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.kDh = !1),
      (this.GDh = 0),
      (this.ODh = !1),
      (this.FDh = 0);
  }
  static Create(t) {
    if (t) return new FbInteractSectorRange(t);
  }
  get Begin() {
    return (
      this.kDh || ((this.kDh = !0), (this.GDh = this.FbDataInternal.begin())),
      this.GDh
    );
  }
  get End() {
    return (
      this.ODh || ((this.ODh = !0), (this.FDh = this.FbDataInternal.end())),
      this.FDh
    );
  }
}
exports.FbInteractSectorRange = FbInteractSectorRange;
//# sourceMappingURL=FbInteractSectorRange.js.map
