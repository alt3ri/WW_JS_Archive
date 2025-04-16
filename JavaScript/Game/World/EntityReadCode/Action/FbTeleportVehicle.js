"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportVehicle = void 0);
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTeleportVehicle {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._Mh = !1),
      (this.cMh = void 0),
      (this.uch = !1),
      (this.dch = void 0),
      (this.Aph = !1),
      (this.xph = void 0),
      (this.GKl = !1),
      (this.FKl = 0),
      (this.NKl = !1),
      (this.VKl = !1);
  }
  static Create(t) {
    if (t) return new FbTeleportVehicle(t);
  }
  get TargetVehicle() {
    var t, e;
    return (
      !this._Mh &&
        ((this._Mh = !0),
        (t = this.FbDataInternal.targetVehicleType()),
        (e =
          UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.GetUnionTargetVehicleObject(
            t,
          ))) &&
        (this.cMh =
          UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.ReadUnionTargetVehicle(
            t,
            this.FbDataInternal.targetVehicle(e),
          )),
      this.cMh
    );
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.pos(),
        ))),
      this.dch
    );
  }
  get Rot() {
    return (
      this.Aph ||
        ((this.Aph = !0),
        (this.xph = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rot(),
        ))),
      this.xph
    );
  }
  get AppointedDock() {
    return (
      this.GKl ||
        ((this.GKl = !0), (this.FKl = this.FbDataInternal.appointedDock())),
      this.FKl
    );
  }
  get IsTeleportNoLoading() {
    return (
      this.NKl ||
        ((this.NKl = !0),
        (this.VKl = this.FbDataInternal.isTeleportNoLoading())),
      this.VKl
    );
  }
}
exports.FbTeleportVehicle = FbTeleportVehicle;
//# sourceMappingURL=FbTeleportVehicle.js.map
