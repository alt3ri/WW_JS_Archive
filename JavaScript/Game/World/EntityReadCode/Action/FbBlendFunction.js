"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBlendFunction = void 0);
class FbBlendFunction {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.ATh = !1),
      (this.xTh = 0);
  }
  static Create(t) {
    if (t) return new FbBlendFunction(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BlendExp() {
    return (
      this.ATh ||
        ((this.ATh = !0), (this.xTh = this.FbDataInternal.blendExp())),
      this.xTh
    );
  }
}
exports.FbBlendFunction = FbBlendFunction;
//# sourceMappingURL=FbBlendFunction.js.map
