"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTelePortAfterTimeOut = void 0);
class FbTelePortAfterTimeOut {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.P0h = !1),
      (this.U0h = 0);
  }
  static Create(t) {
    if (t) return new FbTelePortAfterTimeOut(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TimeOut() {
    return (
      this.P0h || ((this.P0h = !0), (this.U0h = this.FbDataInternal.timeOut())),
      this.U0h
    );
  }
}
exports.FbTelePortAfterTimeOut = FbTelePortAfterTimeOut;
//# sourceMappingURL=FbTelePortAfterTimeOut.js.map
