"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSelfVarRef = void 0);
class FbSelfVarRef {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bZh = !1),
      (this.LZh = void 0),
      (this.x_h = !1),
      (this.FGi = void 0);
  }
  static Create(t) {
    if (t) return new FbSelfVarRef(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Source() {
    return (
      this.bZh || ((this.bZh = !0), (this.LZh = this.FbDataInternal.source())),
      this.LZh
    );
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
}
exports.FbSelfVarRef = FbSelfVarRef;
//# sourceMappingURL=FbSelfVarRef.js.map
