"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLocationSafetyComponent = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbLocationSafetyComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.sXh = !1),
      (this.aXh = void 0),
      (this.HVh = !1),
      (this.WVh = void 0);
  }
  static Create(t) {
    if (t) return new FbLocationSafetyComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get DetectionFrequency() {
    return (
      this.sXh ||
        ((this.sXh = !0),
        (this.aXh = this.FbDataInternal.detectionFrequency())),
      this.aXh
    );
  }
  get SafeLocation() {
    return (
      this.HVh ||
        ((this.HVh = !0),
        (this.WVh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.safeLocation(),
        ))),
      this.WVh
    );
  }
}
exports.FbLocationSafetyComponent = FbLocationSafetyComponent;
//# sourceMappingURL=FbLocationSafetyComponent.js.map
