"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckIsPlayerUsingVehicle = void 0);
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckIsPlayerUsingVehicle {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.AXh = !1),
      (this.xXh = void 0),
      (this.wJh = !1),
      (this.PJh = !1),
      (this.czh = !1),
      (this.uzh = void 0);
  }
  static Create(i) {
    if (i) return new FbCheckIsPlayerUsingVehicle(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get VehicleType() {
    return (
      this.AXh ||
        ((this.AXh = !0), (this.xXh = this.FbDataInternal.vehicleType())),
      this.xXh
    );
  }
  get CheckType() {
    return (
      this.wJh ||
        ((this.wJh = !0), (this.PJh = this.FbDataInternal.checkType())),
      this.PJh
    );
  }
  get OnlinePlayerConditionTargetOption() {
    var i, e;
    return (
      !this.czh &&
        ((this.czh = !0),
        (i = this.FbDataInternal.onlinePlayerConditionTargetOptionType()),
        (e =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(
            i,
          ))) &&
        (this.uzh =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(
            i,
            this.FbDataInternal.onlinePlayerConditionTargetOption(e),
          )),
      this.uzh
    );
  }
}
exports.FbCheckIsPlayerUsingVehicle = FbCheckIsPlayerUsingVehicle;
//# sourceMappingURL=FbCheckIsPlayerUsingVehicle.js.map
