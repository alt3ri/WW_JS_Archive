"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGlobalVarRef = void 0);
class FbGlobalVarRef {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bZh = !1),
      (this.LZh = void 0),
      (this.AZh = !1),
      (this.xZh = void 0);
  }
  static Create(t) {
    if (t) return new FbGlobalVarRef(t);
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
  get Keyword() {
    return (
      this.AZh || ((this.AZh = !0), (this.xZh = this.FbDataInternal.keyword())),
      this.xZh
    );
  }
}
exports.FbGlobalVarRef = FbGlobalVarRef;
//# sourceMappingURL=FbGlobalVarRef.js.map
