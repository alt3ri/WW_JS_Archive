"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimeStopComponent = void 0);
const FbTimeStopTarget_1 = require("./FbTimeStopTarget");
class FbTimeStopComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.PKh = !1),
      (this.UKh = void 0),
      (this.jEh = !1),
      (this.HEh = 0),
      (this.ldh = !1),
      (this.NHo = void 0);
  }
  static Create(t) {
    if (t) return new FbTimeStopComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ActiveState() {
    return (
      this.PKh ||
        ((this.PKh = !0), (this.UKh = this.FbDataInternal.activeState())),
      this.UKh
    );
  }
  get StopTime() {
    return (
      this.jEh ||
        ((this.jEh = !0), (this.HEh = this.FbDataInternal.stopTime())),
      this.HEh
    );
  }
  get Target() {
    return (
      this.ldh ||
        ((this.ldh = !0),
        (this.NHo = FbTimeStopTarget_1.FbTimeStopTarget.Create(
          this.FbDataInternal.target(),
        ))),
      this.NHo
    );
  }
}
exports.FbTimeStopComponent = FbTimeStopComponent;
//# sourceMappingURL=FbTimeStopComponent.js.map
