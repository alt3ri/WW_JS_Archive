"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckAlertAreaEnabled = void 0);
class FbCheckAlertAreaEnabled {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yph = !1),
      (this.zph = 0);
  }
  static Create(t) {
    if (t) return new FbCheckAlertAreaEnabled(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AreaId() {
    return (
      this.Yph || ((this.Yph = !0), (this.zph = this.FbDataInternal.areaId())),
      this.zph
    );
  }
}
exports.FbCheckAlertAreaEnabled = FbCheckAlertAreaEnabled;
//# sourceMappingURL=FbCheckAlertAreaEnabled.js.map
