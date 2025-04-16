"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckFishingCageFillingRatio = void 0);
class FbCheckFishingCageFillingRatio {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.jP_ = !1),
      (this.HP_ = 0);
  }
  static Create(i) {
    if (i) return new FbCheckFishingCageFillingRatio(i);
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
  get Ratio() {
    return (
      this.jP_ || ((this.jP_ = !0), (this.HP_ = this.FbDataInternal.ratio())),
      this.HP_
    );
  }
}
exports.FbCheckFishingCageFillingRatio = FbCheckFishingCageFillingRatio;
//# sourceMappingURL=FbCheckFishingCageFillingRatio.js.map
