"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMontageId = void 0);
class FbMontageId {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Rfh = !1),
      (this.wfh = 0),
      (this.$fh = !1),
      (this.Xfh = !1);
  }
  static Create(t) {
    if (t) return new FbMontageId(t);
  }
  get MontageId() {
    return (
      this.Rfh ||
        ((this.Rfh = !0), (this.wfh = this.FbDataInternal.montageId())),
      this.wfh
    );
  }
  get IsAbp() {
    return (
      this.$fh || ((this.$fh = !0), (this.Xfh = this.FbDataInternal.isAbp())),
      this.Xfh
    );
  }
}
exports.FbMontageId = FbMontageId;
//# sourceMappingURL=FbMontageId.js.map
