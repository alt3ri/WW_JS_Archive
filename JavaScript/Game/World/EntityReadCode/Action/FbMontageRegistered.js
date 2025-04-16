"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMontageRegistered = void 0);
const FbMontageId_1 = require("./FbMontageId");
class FbMontageRegistered {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Rfh = !1),
      (this.wfh = void 0);
  }
  static Create(t) {
    if (t) return new FbMontageRegistered(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MontageId() {
    return (
      this.Rfh ||
        ((this.Rfh = !0),
        (this.wfh = FbMontageId_1.FbMontageId.Create(
          this.FbDataInternal.montageId(),
        ))),
      this.wfh
    );
  }
}
exports.FbMontageRegistered = FbMontageRegistered;
//# sourceMappingURL=FbMontageRegistered.js.map
