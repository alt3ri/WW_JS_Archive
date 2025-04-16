"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleSprint = void 0);
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
class FbVehicleSprint {
  constructor(e) {
    (this.FbDataInternal = e), (this._Mh = !1), (this.cMh = void 0);
  }
  static Create(e) {
    if (e) return new FbVehicleSprint(e);
  }
  get TargetVehicle() {
    var e, t;
    return (
      !this._Mh &&
        ((this._Mh = !0),
        (e = this.FbDataInternal.targetVehicleType()),
        (t =
          UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.GetUnionTargetVehicleObject(
            e,
          ))) &&
        (this.cMh =
          UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.ReadUnionTargetVehicle(
            e,
            this.FbDataInternal.targetVehicle(t),
          )),
      this.cMh
    );
  }
}
exports.FbVehicleSprint = FbVehicleSprint;
//# sourceMappingURL=FbVehicleSprint.js.map
