"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAppointedVehicle = void 0);
class FbAppointedVehicle {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.yMh = !1),
      (this.SMh = 0);
  }
  static Create(t) {
    if (t) return new FbAppointedVehicle(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get VehicleId() {
    return (
      this.yMh ||
        ((this.yMh = !0), (this.SMh = this.FbDataInternal.vehicleId())),
      this.SMh
    );
  }
}
exports.FbAppointedVehicle = FbAppointedVehicle;
//# sourceMappingURL=FbAppointedVehicle.js.map
