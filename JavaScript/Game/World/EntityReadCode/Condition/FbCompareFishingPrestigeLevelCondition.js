"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareFishingPrestigeLevelCondition = void 0);
class FbCompareFishingPrestigeLevelCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.LKl = !1),
      (this.AKl = 0);
  }
  static Create(t) {
    if (t) return new FbCompareFishingPrestigeLevelCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get PrestigeLevel() {
    return (
      this.LKl ||
        ((this.LKl = !0), (this.AKl = this.FbDataInternal.prestigeLevel())),
      this.AKl
    );
  }
}
exports.FbCompareFishingPrestigeLevelCondition =
  FbCompareFishingPrestigeLevelCondition;
//# sourceMappingURL=FbCompareFishingPrestigeLevelCondition.js.map
