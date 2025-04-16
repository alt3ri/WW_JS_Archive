"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLimitPlayerMoveNew = void 0);
class FbLimitPlayerMoveNew {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.o0h = !1),
      (this.n0h = !1),
      (this.s0h = !1),
      (this.a0h = !1),
      (this.e0h = !1),
      (this.t0h = !1),
      (this.i0h = !1),
      (this.r0h = !1);
  }
  static Create(t) {
    if (t) return new FbLimitPlayerMoveNew(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Forward() {
    return (
      this.o0h || ((this.o0h = !0), (this.n0h = this.FbDataInternal.forward())),
      this.n0h
    );
  }
  get Back() {
    return (
      this.s0h || ((this.s0h = !0), (this.a0h = this.FbDataInternal.back())),
      this.a0h
    );
  }
  get Left() {
    return (
      this.e0h || ((this.e0h = !0), (this.t0h = this.FbDataInternal.left())),
      this.t0h
    );
  }
  get Right() {
    return (
      this.i0h || ((this.i0h = !0), (this.r0h = this.FbDataInternal.right())),
      this.r0h
    );
  }
}
exports.FbLimitPlayerMoveNew = FbLimitPlayerMoveNew;
//# sourceMappingURL=FbLimitPlayerMoveNew.js.map
