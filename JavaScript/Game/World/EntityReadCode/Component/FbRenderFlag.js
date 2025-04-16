"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRenderFlag = void 0);
class FbRenderFlag {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Jch = !1),
      (this.l7 = !1);
  }
  static Create(t) {
    if (t) return new FbRenderFlag(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Enable() {
    return (
      this.Jch || ((this.Jch = !0), (this.l7 = this.FbDataInternal.enable())),
      this.l7
    );
  }
}
exports.FbRenderFlag = FbRenderFlag;
//# sourceMappingURL=FbRenderFlag.js.map
