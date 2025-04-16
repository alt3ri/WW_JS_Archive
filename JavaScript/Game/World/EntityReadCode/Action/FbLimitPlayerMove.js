"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLimitPlayerMove = void 0);
class FbLimitPlayerMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Pyh = !1),
      (this.Uyh = !1);
  }
  static Create(t) {
    if (t) return new FbLimitPlayerMove(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsOnlyForward() {
    return (
      this.Pyh ||
        ((this.Pyh = !0), (this.Uyh = this.FbDataInternal.isOnlyForward())),
      this.Uyh
    );
  }
}
exports.FbLimitPlayerMove = FbLimitPlayerMove;
//# sourceMappingURL=FbLimitPlayerMove.js.map
