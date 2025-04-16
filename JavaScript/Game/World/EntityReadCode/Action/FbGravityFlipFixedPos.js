"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGravityFlipFixedPos = void 0);
class FbGravityFlipFixedPos {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.R0h = !1),
      (this.w0h = 0);
  }
  static Create(t) {
    if (t) return new FbGravityFlipFixedPos(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get GravityAndPosEntityId() {
    return (
      this.R0h ||
        ((this.R0h = !0),
        (this.w0h = this.FbDataInternal.gravityAndPosEntityId())),
      this.w0h
    );
  }
}
exports.FbGravityFlipFixedPos = FbGravityFlipFixedPos;
//# sourceMappingURL=FbGravityFlipFixedPos.js.map
