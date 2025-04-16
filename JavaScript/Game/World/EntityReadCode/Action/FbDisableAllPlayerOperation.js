"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableAllPlayerOperation = void 0);
class FbDisableAllPlayerOperation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Dyh = !1),
      (this.Byh = void 0);
  }
  static Create(t) {
    if (t) return new FbDisableAllPlayerOperation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get DisplayMode() {
    return (
      this.Dyh ||
        ((this.Dyh = !0), (this.Byh = this.FbDataInternal.displayMode())),
      this.Byh
    );
  }
}
exports.FbDisableAllPlayerOperation = FbDisableAllPlayerOperation;
//# sourceMappingURL=FbDisableAllPlayerOperation.js.map
