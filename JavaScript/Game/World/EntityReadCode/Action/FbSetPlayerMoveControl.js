"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetPlayerMoveControl = void 0);
class FbSetPlayerMoveControl {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.e0h = !1),
      (this.t0h = 0),
      (this.i0h = !1),
      (this.r0h = 0),
      (this.o0h = !1),
      (this.n0h = 0),
      (this.s0h = !1),
      (this.a0h = 0);
  }
  static Create(t) {
    if (t) return new FbSetPlayerMoveControl(t);
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
}
exports.FbSetPlayerMoveControl = FbSetPlayerMoveControl;
//# sourceMappingURL=FbSetPlayerMoveControl.js.map
