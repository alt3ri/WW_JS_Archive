"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTrampleUe5Component = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbTrampleUe5Component {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.ckh = !1),
      (this.ukh = !1),
      (this.dkh = !1),
      (this.mkh = void 0),
      (this.Ckh = !1),
      (this.gkh = void 0);
  }
  static Create(t) {
    if (t) return new FbTrampleUe5Component(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get IsDisposable() {
    return (
      this.ckh ||
        ((this.ckh = !0), (this.ukh = this.FbDataInternal.isDisposable())),
      this.ukh
    );
  }
  get TriggerActions() {
    if (!this.dkh) {
      (this.dkh = !0), (this.mkh = new Array());
      var i = this.FbDataInternal.triggerActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.triggerActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.mkh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.mkh;
  }
  get RecoveryActions() {
    if (!this.Ckh) {
      (this.Ckh = !0), (this.gkh = new Array());
      var i = this.FbDataInternal.recoveryActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.recoveryActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.gkh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.gkh;
  }
}
exports.FbTrampleUe5Component = FbTrampleUe5Component;
//# sourceMappingURL=FbTrampleUe5Component.js.map
