"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActionInfo = void 0);
const ActionReadHelper_1 = require("./ActionReadHelper");
class FbActionInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.R_h = !1),
      (this.w_h = !1),
      (this.P_h = !1),
      (this.U_h = void 0),
      (this.D_h = !1),
      (this.B_h = 0),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.G_h = !1),
      (this.O_h = void 0),
      (this.Tuh = !1),
      (this.buh = 0);
  }
  static Create(t) {
    if (t) return new FbActionInfo(t);
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get Async() {
    return (
      this.R_h || ((this.R_h = !0), (this.w_h = this.FbDataInternal.async())),
      this.w_h
    );
  }
  get Params() {
    return (
      this.P_h ||
        ((this.P_h = !0),
        (this.U_h = ActionReadHelper_1.ActionReadHelper.ReadActionParams(
          this.FbDataInternal,
        ))),
      this.U_h
    );
  }
  get ActionId() {
    return (
      this.D_h ||
        ((this.D_h = !0), (this.B_h = this.FbDataInternal.actionId())),
      this.B_h
    );
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ActionGuid() {
    return (
      this.G_h ||
        ((this.G_h = !0), (this.O_h = this.FbDataInternal.actionGuid())),
      this.O_h
    );
  }
  get Timeout() {
    return (
      this.Tuh || ((this.Tuh = !0), (this.buh = this.FbDataInternal.timeout())),
      this.buh
    );
  }
}
exports.FbActionInfo = FbActionInfo;
//# sourceMappingURL=FbActionInfo.js.map
