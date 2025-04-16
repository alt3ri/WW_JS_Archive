"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGravityFlipConfig = void 0);
class FbGravityFlipConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bMh = !1),
      (this.LMh = 0);
  }
  static Create(t) {
    if (t) return new FbGravityFlipConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get LocationEntityId() {
    return (
      this.bMh ||
        ((this.bMh = !0), (this.LMh = this.FbDataInternal.locationEntityId())),
      this.LMh
    );
  }
}
exports.FbGravityFlipConfig = FbGravityFlipConfig;
//# sourceMappingURL=FbGravityFlipConfig.js.map
