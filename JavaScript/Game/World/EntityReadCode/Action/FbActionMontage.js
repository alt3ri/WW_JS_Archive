"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActionMontage = void 0);
class FbActionMontage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Zdh = !1),
      (this.emh = void 0),
      (this.Hdh = !1),
      (this.Xdr = void 0);
  }
  static Create(t) {
    if (t) return new FbActionMontage(t);
  }
  get MontageType() {
    return (
      this.Zdh ||
        ((this.Zdh = !0), (this.emh = this.FbDataInternal.montageType())),
      this.emh
    );
  }
  get Path() {
    return (
      this.Hdh || ((this.Hdh = !0), (this.Xdr = this.FbDataInternal.path())),
      this.Xdr
    );
  }
}
exports.FbActionMontage = FbActionMontage;
//# sourceMappingURL=FbActionMontage.js.map
