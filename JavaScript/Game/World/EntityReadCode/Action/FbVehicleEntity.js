"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleEntity = void 0);
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
class FbVehicleEntity {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Tic = !1),
      (this.bic = void 0);
  }
  static Create(e) {
    if (e) return new FbVehicleEntity(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Vehicle() {
    var e, t;
    return (
      !this.Tic &&
        ((this.Tic = !0),
        (e = this.FbDataInternal.vehicleType()),
        (t =
          UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.GetUnionTargetVehicleObject(
            e,
          ))) &&
        (this.bic =
          UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.ReadUnionTargetVehicle(
            e,
            this.FbDataInternal.vehicle(t),
          )),
      this.bic
    );
  }
}
exports.FbVehicleEntity = FbVehicleEntity;
//# sourceMappingURL=FbVehicleEntity.js.map
