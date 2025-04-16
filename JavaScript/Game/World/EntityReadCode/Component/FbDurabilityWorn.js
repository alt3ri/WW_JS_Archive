"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDurabilityWorn = void 0);
class FbDurabilityWorn {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.g3h = !1),
      (this.f3h = 0),
      (this.p3h = !1),
      (this.v3h = 0);
  }
  static Create(t) {
    if (t) return new FbDurabilityWorn(t);
  }
  get SlightWear() {
    return (
      this.g3h ||
        ((this.g3h = !0), (this.f3h = this.FbDataInternal.slightWear())),
      this.f3h
    );
  }
  get SevereWear() {
    return (
      this.p3h ||
        ((this.p3h = !0), (this.v3h = this.FbDataInternal.severeWear())),
      this.v3h
    );
  }
}
exports.FbDurabilityWorn = FbDurabilityWorn;
//# sourceMappingURL=FbDurabilityWorn.js.map
