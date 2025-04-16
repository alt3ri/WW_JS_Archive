"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStopNewMoveWithSpline = void 0);
const UnionNewSplineMoveTargetHelper_1 = require("./UnionNewSplineMoveTargetHelper"),
  UnionStopNewMoveWithSplineTypeHelper_1 = require("./UnionStopNewMoveWithSplineTypeHelper");
class FbStopNewMoveWithSpline {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.J_1 = !1),
      (this.Z_1 = void 0),
      (this.ZEh = !1),
      (this.eIh = void 0);
  }
  static Create(e) {
    if (e) return new FbStopNewMoveWithSpline(e);
  }
  get StopTarget() {
    var e, t;
    return (
      !this.J_1 &&
        ((this.J_1 = !0),
        (e = this.FbDataInternal.stopTargetType()),
        (t =
          UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.GetUnionNewSplineMoveTargetObject(
            e,
          ))) &&
        (this.Z_1 =
          UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.ReadUnionNewSplineMoveTarget(
            e,
            this.FbDataInternal.stopTarget(t),
          )),
      this.Z_1
    );
  }
  get StopType() {
    var e, t;
    return (
      !this.ZEh &&
        ((this.ZEh = !0),
        (e = this.FbDataInternal.stopTypeType()),
        (t =
          UnionStopNewMoveWithSplineTypeHelper_1.UnionStopNewMoveWithSplineTypeHelper.GetUnionStopNewMoveWithSplineTypeObject(
            e,
          ))) &&
        (this.eIh =
          UnionStopNewMoveWithSplineTypeHelper_1.UnionStopNewMoveWithSplineTypeHelper.ReadUnionStopNewMoveWithSplineType(
            e,
            this.FbDataInternal.stopType(t),
          )),
      this.eIh
    );
  }
}
exports.FbStopNewMoveWithSpline = FbStopNewMoveWithSpline;
//# sourceMappingURL=FbStopNewMoveWithSpline.js.map
