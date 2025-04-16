"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMovementVehicleFeature = void 0);
const FbMovementPerformConfig_1 = require("./FbMovementPerformConfig");
class FbMovementVehicleFeature {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.nHl = !1),
      (this.sHl = 0),
      (this.n7l = !1),
      (this.s7l = void 0);
  }
  static Create(e) {
    if (e) return new FbMovementVehicleFeature(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MoveSpline() {
    return (
      this.nHl ||
        ((this.nHl = !0), (this.sHl = this.FbDataInternal.moveSpline())),
      this.sHl
    );
  }
  get MovePerformConfig() {
    return (
      this.n7l ||
        ((this.n7l = !0),
        (this.s7l = FbMovementPerformConfig_1.FbMovementPerformConfig.Create(
          this.FbDataInternal.movePerformConfig(),
        ))),
      this.s7l
    );
  }
}
exports.FbMovementVehicleFeature = FbMovementVehicleFeature;
//# sourceMappingURL=FbMovementVehicleFeature.js.map
