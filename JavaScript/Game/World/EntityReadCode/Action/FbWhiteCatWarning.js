"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWhiteCatWarning = void 0);
class FbWhiteCatWarning {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hyh = !1),
      (this.lyh = void 0);
  }
  static Create(t) {
    if (t) return new FbWhiteCatWarning(t);
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
exports.FbWhiteCatWarning = FbWhiteCatWarning;
//# sourceMappingURL=FbWhiteCatWarning.js.map
