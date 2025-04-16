"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleCruisingParams = void 0);
class FbVehicleCruisingParams {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.bEc = !1),
      (this.LEc = 0),
      (this.wEc = !1),
      (this.REc = 0),
      (this.AEc = !1),
      (this.PEc = !1);
  }
  static Create(t) {
    if (t) return new FbVehicleCruisingParams(t);
  }
  get ForwardSpeed() {
    return (
      this.bEc ||
        ((this.bEc = !0), (this.LEc = this.FbDataInternal.forwardSpeed())),
      this.LEc
    );
  }
  get ForwardAcceleration() {
    return (
      this.wEc ||
        ((this.wEc = !0),
        (this.REc = this.FbDataInternal.forwardAcceleration())),
      this.REc
    );
  }
  get DisableSprint() {
    return (
      this.AEc ||
        ((this.AEc = !0), (this.PEc = this.FbDataInternal.disableSprint())),
      this.PEc
    );
  }
}
exports.FbVehicleCruisingParams = FbVehicleCruisingParams;
//# sourceMappingURL=FbVehicleCruisingParams.js.map
