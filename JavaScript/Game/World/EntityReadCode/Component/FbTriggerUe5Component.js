"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerUe5Component = void 0);
const FbTriggerActions_1 = require("../Action/FbTriggerActions");
class FbTriggerUe5Component {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.vkh = !1),
      (this.ykh = 0),
      (this.Skh = !1),
      (this.Mkh = !1),
      (this.dkh = !1),
      (this.mkh = void 0);
  }
  static Create(t) {
    if (t) return new FbTriggerUe5Component(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get MaxTriggerTimes() {
    return (
      this.vkh ||
        ((this.vkh = !0), (this.ykh = this.FbDataInternal.maxTriggerTimes())),
      this.ykh
    );
  }
  get IsNotLoad() {
    return (
      this.Skh ||
        ((this.Skh = !0), (this.Mkh = this.FbDataInternal.isNotLoad())),
      this.Mkh
    );
  }
  get TriggerActions() {
    return (
      this.dkh ||
        ((this.dkh = !0),
        (this.mkh = FbTriggerActions_1.FbTriggerActions.Create(
          this.FbDataInternal.triggerActions(),
        ))),
      this.mkh
    );
  }
}
exports.FbTriggerUe5Component = FbTriggerUe5Component;
//# sourceMappingURL=FbTriggerUe5Component.js.map
