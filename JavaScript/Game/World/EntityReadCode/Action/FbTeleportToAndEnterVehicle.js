"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportToAndEnterVehicle = void 0);
const UnionTeleportToAndEnterVehicleTypeHelper_1 = require("./UnionTeleportToAndEnterVehicleTypeHelper");
class FbTeleportToAndEnterVehicle {
  constructor(e) {
    (this.FbDataInternal = e), (this.s5_ = !1), (this.a5_ = void 0);
  }
  static Create(e) {
    if (e) return new FbTeleportToAndEnterVehicle(e);
  }
  get ToVehicle() {
    var e, t;
    return (
      !this.s5_ &&
        ((this.s5_ = !0),
        (e = this.FbDataInternal.toVehicleType()),
        (t =
          UnionTeleportToAndEnterVehicleTypeHelper_1.UnionTeleportToAndEnterVehicleTypeHelper.GetUnionTeleportToAndEnterVehicleTypeObject(
            e,
          ))) &&
        (this.a5_ =
          UnionTeleportToAndEnterVehicleTypeHelper_1.UnionTeleportToAndEnterVehicleTypeHelper.ReadUnionTeleportToAndEnterVehicleType(
            e,
            this.FbDataInternal.toVehicle(t),
          )),
      this.a5_
    );
  }
}
exports.FbTeleportToAndEnterVehicle = FbTeleportToAndEnterVehicle;
//# sourceMappingURL=FbTeleportToAndEnterVehicle.js.map
