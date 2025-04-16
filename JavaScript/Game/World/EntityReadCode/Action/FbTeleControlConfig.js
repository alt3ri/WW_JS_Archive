"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleControlConfig = void 0);
class FbTeleControlConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mLh = !1),
      (this.CLh = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleControlConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TeleControlType() {
    return (
      this.mLh ||
        ((this.mLh = !0), (this.CLh = this.FbDataInternal.teleControlType())),
      this.CLh
    );
  }
}
exports.FbTeleControlConfig = FbTeleControlConfig;
//# sourceMappingURL=FbTeleControlConfig.js.map
