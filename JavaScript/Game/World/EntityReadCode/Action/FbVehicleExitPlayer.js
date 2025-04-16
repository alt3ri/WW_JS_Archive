"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleExitPlayer = void 0);
const UnionExitVehicleTypeHelper_1 = require("./UnionExitVehicleTypeHelper");
class FbVehicleExitPlayer {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.pMh = !1),
      (this.vMh = !1),
      (this.mMh = !1),
      (this.CMh = void 0);
  }
  static Create(e) {
    if (e) return new FbVehicleExitPlayer(e);
  }
  get DestroyVehicle() {
    return (
      this.pMh ||
        ((this.pMh = !0), (this.vMh = this.FbDataInternal.destroyVehicle())),
      this.vMh
    );
  }
  get ExitType() {
    var e, i;
    return (
      !this.mMh &&
        ((this.mMh = !0),
        (e = this.FbDataInternal.exitTypeType()),
        (i =
          UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.GetUnionExitVehicleTypeObject(
            e,
          ))) &&
        (this.CMh =
          UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.ReadUnionExitVehicleType(
            e,
            this.FbDataInternal.exitType(i),
          )),
      this.CMh
    );
  }
}
exports.FbVehicleExitPlayer = FbVehicleExitPlayer;
//# sourceMappingURL=FbVehicleExitPlayer.js.map
