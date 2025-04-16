"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMinAlertValue = void 0);
class FbMinAlertValue {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbMinAlertValue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbMinAlertValue = FbMinAlertValue;
//# sourceMappingURL=FbMinAlertValue.js.map
