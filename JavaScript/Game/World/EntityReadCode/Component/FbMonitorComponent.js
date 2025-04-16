"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonitorComponent = void 0);
const FbConeTriggerShape_1 = require("../Shape/FbConeTriggerShape");
class FbMonitorComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.M_h = !1),
      (this.E_h = void 0),
      (this.dQl = !1),
      (this.mQl = void 0),
      (this.QXh = !1),
      (this.KXh = void 0),
      (this.$Xh = !1),
      (this.XXh = void 0);
  }
  static Create(t) {
    if (t) return new FbMonitorComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Range() {
    return (
      this.M_h ||
        ((this.M_h = !0),
        (this.E_h = FbConeTriggerShape_1.FbConeTriggerShape.Create(
          this.FbDataInternal.range(),
        ))),
      this.E_h
    );
  }
  get AvailableStates() {
    if (!this.dQl) {
      (this.dQl = !0), (this.mQl = new Array());
      var i = this.FbDataInternal.availableStatesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.mQl.push(this.FbDataInternal.availableStates(t));
    }
    return this.mQl;
  }
  get StateAfterTriggered() {
    return (
      this.QXh ||
        ((this.QXh = !0),
        (this.KXh = this.FbDataInternal.stateAfterTriggered())),
      this.KXh
    );
  }
  get StateAfterLeaved() {
    return (
      this.$Xh ||
        ((this.$Xh = !0), (this.XXh = this.FbDataInternal.stateAfterLeaved())),
      this.XXh
    );
  }
}
exports.FbMonitorComponent = FbMonitorComponent;
//# sourceMappingURL=FbMonitorComponent.js.map
