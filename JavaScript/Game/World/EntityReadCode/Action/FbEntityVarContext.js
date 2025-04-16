"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityVarContext = void 0);
class FbEntityVarContext {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.qxh = !1),
      (this.kxh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityVarContext(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get MatchType() {
    return (
      this.qxh ||
        ((this.qxh = !0), (this.kxh = this.FbDataInternal.matchType())),
      this.kxh
    );
  }
}
exports.FbEntityVarContext = FbEntityVarContext;
//# sourceMappingURL=FbEntityVarContext.js.map
