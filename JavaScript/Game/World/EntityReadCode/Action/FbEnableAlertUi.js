"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableAlertUi = void 0);
class FbEnableAlertUi {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yph = !1),
      (this.zph = 0),
      (this.Dch = !1),
      (this.bSo = !1);
  }
  static Create(t) {
    if (t) return new FbEnableAlertUi(t);
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
  get IsEnable() {
    return (
      this.Dch ||
        ((this.Dch = !0), (this.bSo = this.FbDataInternal.isEnable())),
      this.bSo
    );
  }
}
exports.FbEnableAlertUi = FbEnableAlertUi;
//# sourceMappingURL=FbEnableAlertUi.js.map
