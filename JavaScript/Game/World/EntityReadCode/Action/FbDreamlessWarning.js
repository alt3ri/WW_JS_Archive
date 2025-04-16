"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDreamlessWarning = void 0);
class FbDreamlessWarning {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hyh = !1),
      (this.lyh = void 0);
  }
  static Create(t) {
    if (t) return new FbDreamlessWarning(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get WarningText() {
    return (
      this.hyh ||
        ((this.hyh = !0), (this.lyh = this.FbDataInternal.warningText())),
      this.lyh
    );
  }
}
exports.FbDreamlessWarning = FbDreamlessWarning;
//# sourceMappingURL=FbDreamlessWarning.js.map
