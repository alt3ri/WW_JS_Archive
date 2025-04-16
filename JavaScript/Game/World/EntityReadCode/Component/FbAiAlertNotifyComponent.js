"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAiAlertNotifyComponent = void 0);
const FbExtraAiAlert_1 = require("./FbExtraAiAlert");
class FbAiAlertNotifyComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.N7h = !1),
      (this.V7h = void 0),
      (this.oxh = !1),
      (this.nxh = void 0),
      (this.j7h = !1),
      (this.H7h = void 0);
  }
  static Create(t) {
    if (t) return new FbAiAlertNotifyComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ExtraAiAlert() {
    return (
      this.N7h ||
        ((this.N7h = !0),
        (this.V7h = FbExtraAiAlert_1.FbExtraAiAlert.Create(
          this.FbDataInternal.extraAiAlert(),
        ))),
      this.V7h
    );
  }
  get ExcludeEntities() {
    if (!this.oxh) {
      (this.oxh = !0), (this.nxh = new Array());
      var i = this.FbDataInternal.excludeEntitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.nxh.push(this.FbDataInternal.excludeEntities(t));
    }
    return this.nxh;
  }
  get AlertSound() {
    return (
      this.j7h ||
        ((this.j7h = !0), (this.H7h = this.FbDataInternal.alertSound())),
      this.H7h
    );
  }
}
exports.FbAiAlertNotifyComponent = FbAiAlertNotifyComponent;
//# sourceMappingURL=FbAiAlertNotifyComponent.js.map
