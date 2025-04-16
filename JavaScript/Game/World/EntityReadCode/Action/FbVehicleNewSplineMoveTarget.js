"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleNewSplineMoveTarget = void 0);
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
class FbVehicleNewSplineMoveTarget {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._Mh = !1),
      (this.cMh = void 0),
      (this.zuh = !1),
      (this.Juh = !1);
  }
  static Create(e) {
    if (e) return new FbVehicleNewSplineMoveTarget(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
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
  get IsLookDir() {
    return (
      this.zuh ||
        ((this.zuh = !0), (this.Juh = this.FbDataInternal.isLookDir())),
      this.Juh
    );
  }
}
exports.FbVehicleNewSplineMoveTarget = FbVehicleNewSplineMoveTarget;
//# sourceMappingURL=FbVehicleNewSplineMoveTarget.js.map
