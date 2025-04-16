"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClientTriggerComponent = void 0);
const FbTriggeredConfig_1 = require("./FbTriggeredConfig"),
  FbTriggerMatchConfig_1 = require("./FbTriggerMatchConfig");
class FbClientTriggerComponent {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Y$h = !1),
      (this.z$h = void 0),
      (this.J$h = !1),
      (this.Z$h = void 0),
      (this.eXh = !1),
      (this.tXh = void 0);
  }
  static Create(i) {
    if (i) return new FbClientTriggerComponent(i);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get TriggerMatch() {
    return (
      this.Y$h ||
        ((this.Y$h = !0),
        (this.z$h = FbTriggerMatchConfig_1.FbTriggerMatchConfig.Create(
          this.FbDataInternal.triggerMatch(),
        ))),
      this.z$h
    );
  }
  get OnTriggerEnter() {
    return (
      this.J$h ||
        ((this.J$h = !0),
        (this.Z$h = FbTriggeredConfig_1.FbTriggeredConfig.Create(
          this.FbDataInternal.onTriggerEnter(),
        ))),
      this.Z$h
    );
  }
  get OnTriggerExit() {
    return (
      this.eXh ||
        ((this.eXh = !0),
        (this.tXh = FbTriggeredConfig_1.FbTriggeredConfig.Create(
          this.FbDataInternal.onTriggerExit(),
        ))),
      this.tXh
    );
  }
}
exports.FbClientTriggerComponent = FbClientTriggerComponent;
//# sourceMappingURL=FbClientTriggerComponent.js.map
