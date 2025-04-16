"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExitVehicleTeleport = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbExitVehicleTeleport {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.uch = !1),
      (this.dch = void 0),
      (this.Aph = !1),
      (this.xph = void 0);
  }
  static Create(t) {
    if (t) return new FbExitVehicleTeleport(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
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
}
exports.FbExitVehicleTeleport = FbExitVehicleTeleport;
//# sourceMappingURL=FbExitVehicleTeleport.js.map
