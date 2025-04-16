"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMaxAlertValue = void 0);
class FbMaxAlertValue {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbMaxAlertValue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbMaxAlertValue = FbMaxAlertValue;
//# sourceMappingURL=FbMaxAlertValue.js.map
