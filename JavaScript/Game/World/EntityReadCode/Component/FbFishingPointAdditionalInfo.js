"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFishingPointAdditionalInfo = void 0);
class FbFishingPointAdditionalInfo {
  constructor(i) {
    (this.FbDataInternal = i), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(i) {
    if (i) return new FbFishingPointAdditionalInfo(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbFishingPointAdditionalInfo = FbFishingPointAdditionalInfo;
//# sourceMappingURL=FbFishingPointAdditionalInfo.js.map
