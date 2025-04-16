"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPasserbyNpcTemplateSource = void 0);
class FbPasserbyNpcTemplateSource {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.GQh = !1),
      (this.OQh = void 0);
  }
  static Create(t) {
    if (t) return new FbPasserbyNpcTemplateSource(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TemplateIds() {
    if (!this.GQh) {
      (this.GQh = !0), (this.OQh = new Array());
      var s = this.FbDataInternal.templateIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.OQh.push(this.FbDataInternal.templateIds(t));
    }
    return this.OQh;
  }
}
exports.FbPasserbyNpcTemplateSource = FbPasserbyNpcTemplateSource;
//# sourceMappingURL=FbPasserbyNpcTemplateSource.js.map
