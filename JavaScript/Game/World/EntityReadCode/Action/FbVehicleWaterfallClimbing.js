"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleWaterfallClimbing = void 0);
const FbVehicleWaterfallClimbGravityConfig_1 = require("./FbVehicleWaterfallClimbGravityConfig");
class FbVehicleWaterfallClimbing {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.fX_ = !1),
      (this.gX_ = void 0);
  }
  static Create(i) {
    if (i) return new FbVehicleWaterfallClimbing(i);
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get ChangeGravity() {
    return (
      this.fX_ ||
        ((this.fX_ = !0),
        (this.gX_ =
          FbVehicleWaterfallClimbGravityConfig_1.FbVehicleWaterfallClimbGravityConfig.Create(
            this.FbDataInternal.changeGravity(),
          ))),
      this.gX_
    );
  }
}
exports.FbVehicleWaterfallClimbing = FbVehicleWaterfallClimbing;
//# sourceMappingURL=FbVehicleWaterfallClimbing.js.map
