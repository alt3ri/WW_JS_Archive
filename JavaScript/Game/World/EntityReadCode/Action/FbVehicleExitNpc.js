"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleExitNpc = void 0);
const UnionExitVehicleTypeHelper_1 = require("./UnionExitVehicleTypeHelper");
class FbVehicleExitNpc {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uMh = !1),
      (this.dMh = 0),
      (this.pMh = !1),
      (this.vMh = !1),
      (this.mMh = !1),
      (this.CMh = void 0);
  }
  static Create(t) {
    if (t) return new FbVehicleExitNpc(t);
  }
  get TargetNpc() {
    return (
      this.uMh ||
        ((this.uMh = !0), (this.dMh = this.FbDataInternal.targetNpc())),
      this.dMh
    );
  }
  get DestroyVehicle() {
    return (
      this.pMh ||
        ((this.pMh = !0), (this.vMh = this.FbDataInternal.destroyVehicle())),
      this.vMh
    );
  }
  get ExitType() {
    var t, e;
    return (
      !this.mMh &&
        ((this.mMh = !0),
        (t = this.FbDataInternal.exitTypeType()),
        (e =
          UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.GetUnionExitVehicleTypeObject(
            t,
          ))) &&
        (this.CMh =
          UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.ReadUnionExitVehicleType(
            t,
            this.FbDataInternal.exitType(e),
          )),
      this.CMh
    );
  }
}
exports.FbVehicleExitNpc = FbVehicleExitNpc;
//# sourceMappingURL=FbVehicleExitNpc.js.map
