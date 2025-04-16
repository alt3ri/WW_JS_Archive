"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbManipulate = void 0);
class FbManipulate {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Vvh = !1),
      (this.jvh = 0);
  }
  static Create(t) {
    if (t) return new FbManipulate(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetEntityId() {
    return (
      this.Vvh ||
        ((this.Vvh = !0), (this.jvh = this.FbDataInternal.targetEntityId())),
      this.jvh
    );
  }
}
exports.FbManipulate = FbManipulate;
//# sourceMappingURL=FbManipulate.js.map
