"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleEnterPathMove = void 0);
const FbVehicleCruisingParams_1 = require("./FbVehicleCruisingParams"),
  UnionSplineMovePatternHelper_1 = require("./UnionSplineMovePatternHelper");
class FbVehicleEnterPathMove {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.cic = !1),
      (this.uic = void 0),
      (this.Pbh = !1),
      (this.Ubh = void 0);
  }
  static Create(e) {
    if (e) return new FbVehicleEnterPathMove(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ControlParams() {
    return (
      this.cic ||
        ((this.cic = !0),
        (this.uic = FbVehicleCruisingParams_1.FbVehicleCruisingParams.Create(
          this.FbDataInternal.controlParams(),
        ))),
      this.uic
    );
  }
  get Pattern() {
    var e, t;
    return (
      !this.Pbh &&
        ((this.Pbh = !0),
        (e = this.FbDataInternal.patternType()),
        (t =
          UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.GetUnionSplineMovePatternObject(
            e,
          ))) &&
        (this.Ubh =
          UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.ReadUnionSplineMovePattern(
            e,
            this.FbDataInternal.pattern(t),
          )),
      this.Ubh
    );
  }
}
exports.FbVehicleEnterPathMove = FbVehicleEnterPathMove;
//# sourceMappingURL=FbVehicleEnterPathMove.js.map
