"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHeadStyleWarning = void 0);
class FbHeadStyleWarning {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbHeadStyleWarning(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbHeadStyleWarning = FbHeadStyleWarning;
//# sourceMappingURL=FbHeadStyleWarning.js.map
