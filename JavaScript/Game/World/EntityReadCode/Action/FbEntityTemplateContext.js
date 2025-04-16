"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityTemplateContext = void 0);
class FbEntityTemplateContext {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityTemplateContext(t);
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
}
exports.FbEntityTemplateContext = FbEntityTemplateContext;
//# sourceMappingURL=FbEntityTemplateContext.js.map
