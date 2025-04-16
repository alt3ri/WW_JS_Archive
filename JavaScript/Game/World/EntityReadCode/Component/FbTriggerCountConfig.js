"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTriggerCountConfig = void 0);
class FbTriggerCountConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.p2h = !1),
      (this.v2h = 0),
      (this.y2h = !1),
      (this.S2h = 0);
  }
  static Create(t) {
    if (t) return new FbTriggerCountConfig(t);
  }
  get TriggerCount() {
    return (
      this.p2h ||
        ((this.p2h = !0), (this.v2h = this.FbDataInternal.triggerCount())),
      this.v2h
    );
  }
  get TriggerInterval() {
    return (
      this.y2h ||
        ((this.y2h = !0), (this.S2h = this.FbDataInternal.triggerInterval())),
      this.S2h
    );
  }
}
exports.FbTriggerCountConfig = FbTriggerCountConfig;
//# sourceMappingURL=FbTriggerCountConfig.js.map
