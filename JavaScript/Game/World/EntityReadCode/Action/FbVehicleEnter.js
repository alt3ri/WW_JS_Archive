"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleEnter = void 0);
const UnionVehicleEnteringTargetHelper_1 = require("./UnionVehicleEnteringTargetHelper");
class FbVehicleEnter {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.sMh = !1),
      (this.aMh = void 0),
      (this.hMh = !1),
      (this.lMh = void 0);
  }
  static Create(e) {
    if (e) return new FbVehicleEnter(e);
  }
  get EnteringTarget() {
    var e, t;
    return (
      !this.sMh &&
        ((this.sMh = !0),
        (e = this.FbDataInternal.enteringTargetType()),
        (t =
          UnionVehicleEnteringTargetHelper_1.UnionVehicleEnteringTargetHelper.GetUnionVehicleEnteringTargetObject(
            e,
          ))) &&
        (this.aMh =
          UnionVehicleEnteringTargetHelper_1.UnionVehicleEnteringTargetHelper.ReadUnionVehicleEnteringTarget(
            e,
            this.FbDataInternal.enteringTarget(t),
          )),
      this.aMh
    );
  }
  get Seat() {
    return (
      this.hMh || ((this.hMh = !0), (this.lMh = this.FbDataInternal.seat())),
      this.lMh
    );
  }
}
exports.FbVehicleEnter = FbVehicleEnter;
//# sourceMappingURL=FbVehicleEnter.js.map
