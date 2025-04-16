"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareFishingTechLevel = void 0);
class FbCompareFishingTechLevel {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.eF_ = !1),
      (this.tF_ = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.iF_ = !1),
      (this.rF_ = 0);
  }
  static Create(t) {
    if (t) return new FbCompareFishingTechLevel(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TechId() {
    return (
      this.eF_ || ((this.eF_ = !0), (this.tF_ = this.FbDataInternal.techId())),
      this.tF_
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get TechLevel() {
    return (
      this.iF_ ||
        ((this.iF_ = !0), (this.rF_ = this.FbDataInternal.techLevel())),
      this.rF_
    );
  }
}
exports.FbCompareFishingTechLevel = FbCompareFishingTechLevel;
//# sourceMappingURL=FbCompareFishingTechLevel.js.map
