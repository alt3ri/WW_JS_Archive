"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableMoveOperation = void 0);
class FbDisableMoveOperation {
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
      (this.r0h = !1),
      (this.Qyh = !1),
      (this.Kyh = !1),
      (this.$yh = !1),
      (this.Xyh = !1),
      (this.Yyh = !1),
      (this.zyh = !1);
  }
  static Create(t) {
    if (t) return new FbDisableMoveOperation(t);
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
  get ForceWalk() {
    return (
      this.Qyh ||
        ((this.Qyh = !0), (this.Kyh = this.FbDataInternal.forceWalk())),
      this.Kyh
    );
  }
  get ForceJog() {
    return (
      this.$yh ||
        ((this.$yh = !0), (this.Xyh = this.FbDataInternal.forceJog())),
      this.Xyh
    );
  }
  get ForbidSprint() {
    return (
      this.Yyh ||
        ((this.Yyh = !0), (this.zyh = this.FbDataInternal.forbidSprint())),
      this.zyh
    );
  }
}
exports.FbDisableMoveOperation = FbDisableMoveOperation;
//# sourceMappingURL=FbDisableMoveOperation.js.map
