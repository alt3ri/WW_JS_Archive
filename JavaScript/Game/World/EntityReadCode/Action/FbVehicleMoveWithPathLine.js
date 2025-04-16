"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleMoveWithPathLine = void 0);
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper"),
  UnionVehicleControlTypeHelper_1 = require("./UnionVehicleControlTypeHelper");
class FbVehicleMoveWithPathLine {
  constructor(e) {
    (this.FbDataInternal = e),
      (this._Mh = !1),
      (this.cMh = void 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.byh = !1),
      (this.Lyh = void 0);
  }
  static Create(e) {
    if (e) return new FbVehicleMoveWithPathLine(e);
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
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get ControlType() {
    var e, t;
    return (
      !this.byh &&
        ((this.byh = !0),
        (e = this.FbDataInternal.controlTypeType()),
        (t =
          UnionVehicleControlTypeHelper_1.UnionVehicleControlTypeHelper.GetUnionVehicleControlTypeObject(
            e,
          ))) &&
        (this.Lyh =
          UnionVehicleControlTypeHelper_1.UnionVehicleControlTypeHelper.ReadUnionVehicleControlType(
            e,
            this.FbDataInternal.controlType(t),
          )),
      this.Lyh
    );
  }
}
exports.FbVehicleMoveWithPathLine = FbVehicleMoveWithPathLine;
//# sourceMappingURL=FbVehicleMoveWithPathLine.js.map
