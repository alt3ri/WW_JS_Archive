"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetAlertUiVisible = void 0);
class FbSetAlertUiVisible {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yph = !1),
      (this.zph = 0),
      (this.tMh = !1),
      (this.ASo = !1);
  }
  static Create(t) {
    if (t) return new FbSetAlertUiVisible(t);
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
  get IsVisible() {
    return (
      this.tMh ||
        ((this.tMh = !0), (this.ASo = this.FbDataInternal.isVisible())),
      this.ASo
    );
  }
}
exports.FbSetAlertUiVisible = FbSetAlertUiVisible;
//# sourceMappingURL=FbSetAlertUiVisible.js.map
