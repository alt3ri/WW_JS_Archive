"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSingleBtnQte = void 0);
const FbQteCallback_1 = require("./FbQteCallback");
class FbSingleBtnQte {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.jYh = !1),
      (this.HYh = 0),
      (this.WYh = !1),
      (this.QYh = void 0),
      (this.KYh = !1),
      (this.$Yh = void 0);
  }
  static Create(t) {
    if (t) return new FbSingleBtnQte(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get QteId() {
    return (
      this.jYh || ((this.jYh = !0), (this.HYh = this.FbDataInternal.qteId())),
      this.HYh
    );
  }
  get SuccessCallback() {
    return (
      this.WYh ||
        ((this.WYh = !0),
        (this.QYh = FbQteCallback_1.FbQteCallback.Create(
          this.FbDataInternal.successCallback(),
        ))),
      this.QYh
    );
  }
  get FailureCallback() {
    return (
      this.KYh ||
        ((this.KYh = !0),
        (this.$Yh = FbQteCallback_1.FbQteCallback.Create(
          this.FbDataInternal.failureCallback(),
        ))),
      this.$Yh
    );
  }
}
exports.FbSingleBtnQte = FbSingleBtnQte;
//# sourceMappingURL=FbSingleBtnQte.js.map
