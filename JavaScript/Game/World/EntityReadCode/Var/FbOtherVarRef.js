"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOtherVarRef = void 0);
class FbOtherVarRef {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bZh = !1),
      (this.LZh = void 0),
      (this.RZh = !1),
      (this.wZh = void 0),
      (this.PZh = !1),
      (this.UZh = 0),
      (this.x_h = !1),
      (this.FGi = void 0);
  }
  static Create(t) {
    if (t) return new FbOtherVarRef(t);
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
  get RefType() {
    return (
      this.RZh || ((this.RZh = !0), (this.wZh = this.FbDataInternal.refType())),
      this.wZh
    );
  }
  get RefId() {
    return (
      this.PZh || ((this.PZh = !0), (this.UZh = this.FbDataInternal.refId())),
      this.UZh
    );
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
}
exports.FbOtherVarRef = FbOtherVarRef;
//# sourceMappingURL=FbOtherVarRef.js.map
