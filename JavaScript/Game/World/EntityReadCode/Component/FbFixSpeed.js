"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixSpeed = void 0);
class FbFixSpeed {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.qmh = !1),
      (this.H8o = 0);
  }
  static Create(t) {
    if (t) return new FbFixSpeed(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Speed() {
    return (
      this.qmh || ((this.qmh = !0), (this.H8o = this.FbDataInternal.speed())),
      this.H8o
    );
  }
}
exports.FbFixSpeed = FbFixSpeed;
//# sourceMappingURL=FbFixSpeed.js.map
