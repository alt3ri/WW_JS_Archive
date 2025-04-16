"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOptionLockTip = void 0);
class FbOptionLockTip {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Y_h = !1),
      (this.z_h = void 0),
      (this.J_h = !1),
      (this.Z_h = void 0),
      (this.ric = !1),
      (this.oic = 0),
      (this.nic = !1),
      (this.sic = 0);
  }
  static Create(t) {
    if (t) return new FbOptionLockTip(t);
  }
  get TidAppendText() {
    return (
      this.Y_h ||
        ((this.Y_h = !0), (this.z_h = this.FbDataInternal.tidAppendText())),
      this.z_h
    );
  }
  get TidHintText() {
    return (
      this.J_h ||
        ((this.J_h = !0), (this.Z_h = this.FbDataInternal.tidHintText())),
      this.Z_h
    );
  }
  get AppendTextId() {
    return (
      this.ric ||
        ((this.ric = !0), (this.oic = this.FbDataInternal.appendTextId())),
      this.oic
    );
  }
  get HintTextId() {
    return (
      this.nic ||
        ((this.nic = !0), (this.sic = this.FbDataInternal.hintTextId())),
      this.sic
    );
  }
}
exports.FbOptionLockTip = FbOptionLockTip;
//# sourceMappingURL=FbOptionLockTip.js.map
