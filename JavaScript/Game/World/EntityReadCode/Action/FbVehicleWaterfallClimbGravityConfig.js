"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleWaterfallClimbGravityConfig = void 0);
class FbVehicleWaterfallClimbGravityConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tic = !1),
      (this.iic = 0),
      (this.yUh = !1),
      (this.SUh = void 0);
  }
  static Create(t) {
    if (t) return new FbVehicleWaterfallClimbGravityConfig(t);
  }
  get SafePositionEntityId() {
    return (
      this.tic ||
        ((this.tic = !0),
        (this.iic = this.FbDataInternal.safePositionEntityId())),
      this.iic
    );
  }
  get GravityDirection() {
    return (
      this.yUh ||
        ((this.yUh = !0), (this.SUh = this.FbDataInternal.gravityDirection())),
      this.SUh
    );
  }
}
exports.FbVehicleWaterfallClimbGravityConfig =
  FbVehicleWaterfallClimbGravityConfig;
//# sourceMappingURL=FbVehicleWaterfallClimbGravityConfig.js.map
